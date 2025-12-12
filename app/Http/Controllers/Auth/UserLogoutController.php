<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class UserLogoutController extends Controller
{
    public function logoutUser(Request $request)
    {
        Log::info("=== LOGOUT REQUEST START ===");

        // Get token from header (Bearer ***)
        $token = $request->bearerToken();

        Log::info("Received Token:", ['token' => $token]);
        Log::info("Current JWT_SECRET:", ['secret' => env('JWT_SECRET')]);

        if (!$token) {
            Log::error("Logout failed: token missing");
            return response()->json([
                'status' => false,
                'message' => 'Token missing in request',
            ], 400);
        }

        try {
            // Invalidate token
            JWTAuth::setToken($token)->invalidate(true);

            Log::info("Logout successful");

            return response()->json([
                'status' => true,
                'message' => 'Logout successful',
            ], 200);
        } catch (\Exception $e) {

            Log::error("Logout error:", ['error' => $e->getMessage()]);

            return response()->json([
                'status' => false,
                'message' => 'Could not invalidate token',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
