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
    public function loginOld(Request $request)
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

    public function login(Request $request)
    {
        try {
            Log::info("LOGIN API HIT", [
                'email' => $request->email,
                'ip' => $request->ip()
            ]);

            $request->validate([
                'email'    => 'required|email',
                'password' => 'required',
            ]);

            /** @var \App\Models\UserLogin|\Illuminate\Contracts\Auth\Authenticatable $userLogin */
            $userLogin = UserLogin::with(['user.role'])
                ->where('email', $request->email)
                ->where('validity_status', 'true')
                ->first();

            if (!$userLogin) {
                Log::warning("LOGIN FAILED - Email not found", [
                    'email' => $request->email,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'status' => false,
                    'msg' => 'The Email or Password is Incorrect. Please try again.'
                ], 401);
            }

            if (!hash_equals($userLogin->password, hash('sha256', $request->password))) {
                Log::warning("LOGIN FAILED - Wrong password", [
                    'email' => $request->email,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'status' => false,
                    'msg' => 'The Email or Password is Incorrect. Please try again.'
                ], 401);
            }

            // ✅ EXTRA SAFETY CHECKS
            if (!$userLogin->user) {
                Log::error("LOGIN FAILED - User missing", [
                    'user_login_id' => $userLogin->id
                ]);

                return response()->json([
                    'status' => false,
                    'msg' => 'User account is not properly configured.'
                ], 403);
            }

            if (!$userLogin->user->role) {
                Log::error("LOGIN FAILED - Role missing", [
                    'user_id' => $userLogin->user->id
                ]);

                return response()->json([
                    'status' => false,
                    'msg' => 'User role is not assigned.'
                ], 403);
            }

            // ✅ JWT TOKEN
            $token = auth('user_api')->login($userLogin);

            $user = [
                'id'          => $userLogin->id,
                'name'        => $userLogin->user->name,
                'email'       => $userLogin->email,
                'role'        => $userLogin->user->role->role_slug,
                'designation' => $userLogin->user->designation,
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
                'msg' => 'Something went wrong, please try again later.'
            ], 500);
        }
    }
}
