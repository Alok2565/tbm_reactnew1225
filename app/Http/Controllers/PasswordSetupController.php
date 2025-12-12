<?php

namespace App\Http\Controllers;

use App\Models\UserLogin;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class PasswordSetupController extends Controller
{


    public function generatePassword(Request $request, $id)
    {
        try {
            Log::info("GENERATE PASSWORD API HIT", [
                'user_id' => $id,
                'ip' => $request->ip()
            ]);

            // Validate input
            $request->validate([
                'password' => 'required|min:8',
                'confirm_password' => 'required|same:password',
            ]);

            // Fetch user record
            $user = UserLogin::find($id);

            if (!$user) {
                Log::warning("PASSWORD RESET FAILED - User not found", [
                    'user_id' => $id,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'status' => false,
                    'message' => 'User not found.'
                ], 404);
            }

            // Hash password using SHA256
            $user->password = hash('sha256', $request->password);
            // Generate JWT Token
            $token = JWTAuth::fromUser($user);
            // Secure random remember token
            $remToken = bin2hex(random_bytes(32));
            $user->remember_token = $remToken;
            // Store auth token (optional)
            $user->auth_token = $token;
            // Save user record
            $user->save();
            Log::info("PASSWORD UPDATED SUCCESSFULLY", [
                'user_id' => $id,
                'ip' => $request->ip()
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Password updated successfully.',
                'token' => $token
            ], 200);
        } catch (\Exception $e) {

            // Log full error details
            Log::error("GENERATE PASSWORD ERROR", [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString(),
                'ip' => $request->ip()
            ]);
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong.',
                'error' => $e->getMessage() // remove in production
            ], 500);
        }
    }
}
