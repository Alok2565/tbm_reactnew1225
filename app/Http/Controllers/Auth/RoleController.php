<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\JsonResponse;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();

        return response()->json([
            'success' => true,
            'data' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createRole(StoreRoleRequest $request): JsonResponse
    {
        try {
            $role = Role::create($request->validated());

            Log::channel('user_access')->info('Role has been created successfully!.', [
                'role_id' => $role->id,
                'role_name' => $role->role_name,
                'creation_date' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Role has been created successfully!',
                'role' => $role,
            ], 201);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error creating role.', [
                'error_message' => $e->getMessage(),
                'creation_date' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to create role. Please try again later.',
            ], 500);
        }
    }

    public function showRoleData($id)
    {
        return Role::findOrFail($id);
    }
    /**
     * Update the specified resource in storage.
     */
    public function updateRole(Request $request, string $id)
    {
        try {
            $role = Role::findOrFail($id);

            $role->role_name = $request->role_name;
            $role->role_slug = $request->role_slug;
            $role->save();

            Log::channel('user_access')->info('Role has been updated successfully!', [
                'role_id' => $role->id,
                'role_name' => $role->role_name,
                'status' => $role->status,
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Role has been updated successfully!',
                'role' => $role,
            ], 200);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error updating role.', [
                'error_message' => $e->getMessage(),
                'datetime' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to update role. Please try again later.',
            ], 500);
        }
    }

    /**
     * Satate the specified resource in storage.
     */
    public function statusRole($id)
    {
        try {
            $role = Role::findOrFail($id);
            $role->status = $role->status == 1 ? 0 : 1;
            $role->save();

            Log::channel('user_access')->info('Role status updated successfully.', [
                'role_id' => $role->id,
                'role_name' => $role->role_name,
                'updated_status' => $role->status,
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Status updated successfully.',
                'status' => $role->status
            ], 200);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error updating role status.', [
                'error_message' => $e->getMessage(),
                'failed_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to update role status. Please try again later.',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteRole(string $id)
    {
        try {
            $role = Role::findOrFail($id);
            $role->delete();

            Log::channel('user_access')->info('Role deleted.', [
                'role_id' => $role->id,
                'deleted_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json(['message' => 'Role deleted successfully.']);
        } catch (\Exception $e) {
            Log::channel('user_access')->error('Role deletion failed.', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to delete role.'], 500);
        }
    }
}
