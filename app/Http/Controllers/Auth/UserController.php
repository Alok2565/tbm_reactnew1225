<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\Role;
use App\Models\user;
use App\Models\UserLogin;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Mail\PasswordSetupMail;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function userLoginData($id)
    {
        $user = UserLogin::with(['user.role'])->findOrFail($id);

        return response()->json([
            "email" => $user->email,
            "user_id" => $user->user_id,
            "role_id" => $user->role_id,
            "role_name" => $user->user->role->role_name
        ]);
    }

    public function index()
    {

        $users = User::all();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    public function createUser(UserRequest $request)
    {
        try {

            $user = User::create($request->validated());

            $userLogin = new UserLogin();
            $userLogin->user_id = $user->id;
            $userLogin->role_id = $user->role_id;
            $userLogin->email = $user->email;
            // $token = Str::random(64);
            $userLogin->ip_address = request()->ip();
            $userLogin->save();

            Log::channel('user_access')->info('User has been created successfully!', [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'user_login_user_id' => $userLogin->id,
                // 'Password gen. Link' => $url,
                'creation_date' => Carbon::now()->toDateTimeString(),
            ]);

            return response()->json([
                'message' => 'User has been created successfully!',
                'user' => $user,
            ], 201);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error creating user.', [
                'error_message' => $e->getMessage(),
                'creation_date' => Carbon::now()->toDateTimeString(),
            ]);

            return response()->json([
                'message' => 'Failed to create user. Please try again later.',
            ], 500);
        }
    }

    public function showUserData($id)
    {
        return User::findOrFail($id);
    }
    /**
     * Update the specified resource in storage.
     */
    public function updateUser(Request $request, string $id)
    {
        try {
            $user = User::findOrFail($id);

            $user->name = $request->name;
            $user->email = $request->email;
            $user->department = $request->department;
            $user->designation = $request->designation;
            $user->address = $request->address;
            $user->mobile_number = $request->mobile_number;
            $user->save();

            Log::channel('user_access')->info('user has been updated successfully!', [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'status' => $user->status,
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'user has been updated successfully!',
                'user' => $user,
            ], 200);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error updating user.', [
                'error_message' => $e->getMessage(),
                'datetime' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to update user. Please try again later.',
            ], 500);
        }
    }

    public function statusUser($id)
    {
        try {
            $User = User::findOrFail($id);
            $User->status = $User->status == 1 ? 0 : 1;
            $User->save();

            Log::channel('user_access')->info('User status updated successfully.', [
                'User_id' => $User->id,
                'User_name' => $User->name,
                'updated_status' => $User->status,
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Status updated successfully.',
                'status' => $User->status
            ], 200);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error updating User status.', [
                'error_message' => $e->getMessage(),
                'failed_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to update User status. Please try again later.',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteUser(string $id)
    {
        try {
            $User = User::findOrFail($id);
            $User->delete();

            Log::channel('user_access')->info('User deleted.', [
                'User_id' => $User->id,
                'deleted_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json(['message' => 'User deleted successfully.']);
        } catch (\Exception $e) {
            Log::channel('user_access')->error('User deletion failed.', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to delete User.'], 500);
        }
    }
}
