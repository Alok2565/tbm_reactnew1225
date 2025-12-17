<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function indexAdmin()
    {
        try {
            // Count users by role
            $rolesCount = User::select('role_id', DB::raw('COUNT(*) as total'))
                ->groupBy('role_id')
                ->get();

            // Optionally, convert to key => value format
            $rolesCount = $rolesCount->mapWithKeys(function ($item) {
                return [$item->role => $item->total];
            });

            return response()->json([
                'success' => true,
                'data' => $rolesCount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
