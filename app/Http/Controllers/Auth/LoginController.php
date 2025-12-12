<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\UserLogin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends Controller
{
    public function login(Request $request)
    {

        try {
            Log::info("LOGIN API HIT", [
                'email' => $request->email,
                'ip' => $request->ip()
            ]);
            $request->validate([
                'email'     => 'required|email',
                'password'  => 'required',
            ]);
            $userLogin = UserLogin::with(['user.role'])
                ->where('email', $request->email)
                ->where('validity_status', 'true')
                ->first();
            //$userLogin = DB::table('user_logins')->get();

            // $userLogin = UserLogin::with(['user.role'])
            //     ->where('email', $request->email)
            //     ->first();
            //dd($userLogin);
            if (!$userLogin || !$userLogin->user) {
                Log::warning("LOGIN FAILED - Email not found", [
                    'email' => $request->email,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'status' => false,
                    'msg'    => 'The Email or Password is Incorrect. Please try again.'
                ], 401);
            }
            $inputHash = hash('sha256', $request->password);
            if (!hash_equals($userLogin->password, $inputHash)) {

                Log::warning("LOGIN FAILED - Wrong password", [
                    'email' => $request->email,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'status' => false,
                    'msg'    => 'The Email or Password is Incorrect. Please try again.'
                ], 401);
            }
            // $roleSlug = $userLogin->user->role->role_slug;
            $token = JWTAuth::fromUser($userLogin->user);
            // $user = $userLogin->user->load('role');
            $user = [
                'id'    => $userLogin->id,
                'name'  => $userLogin->user->name,
                'email' => $userLogin->email,
                'role'  => $userLogin->user->role->role_slug,
                'email' => $userLogin->email,
                'designation' => $userLogin->user->designation

            ];
            Log::info("LOGIN SUCCESS", [
                'email' => $request->email,
                'ip' => $request->ip()
            ]);
            return response()->json([
                'status' => true,
                'token'  => $token,
                'user'   => $user
            ], 200);
        } catch (\Exception $e) {
            Log::error("LOGIN API ERROR", [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString(),
                'ip' => $request->ip()
            ]);

            return response()->json([
                'status' => false,
                'msg'    => 'Something went wrong, please try again later.',
                'error'  => $e->getMessage()
            ], 500);
        }
    }
}
