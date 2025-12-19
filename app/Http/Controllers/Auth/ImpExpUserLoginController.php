<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Models\ImpExpUserLogin;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;

class ImpExpUserLoginController extends Controller
{
    public function loginImpExpOld(Request $request)
    {
        try {
            Log::info("LOGIN API HIT", [
                'iec_code' => $request->iec_code,
                'ip' => $request->ip()
            ]);

            $request->validate([
                'iec_code' => 'required',
                'password' => 'required',
            ]);

            $userLogin = ImpExpUserLogin::with(['impExpUser.role'])
                ->where('iec_code', $request->iec_code)
                ->first();

            if (!$userLogin || !$userLogin->impExpUser) {
                return response()->json([
                    'status' => false,
                    'msg'    => 'The Iec Code or Password is Incorrect. Please try again.'
                ], 401);
            }

            $inputHash = hash('sha256', $request->password);
            if (!hash_equals($userLogin->password, $inputHash)) {
                Log::warning("LOGIN FAILED - Wrong password", [
                    'iec_code' => $request->iec_code,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'status' => false,
                    'msg'    => 'The Iec Code or Password is Incorrect. Please try again.'
                ], 401);
            }

            $token = JWTAuth::fromUser($userLogin);
            // $roleSlug = $userLogin->impExpUser->role->role_slug;
            // $user = $userLogin->impExpUser->load('role');
            // // $request->session()->put('role', $roleSlug);
            // // $request->session()->put('id', $userLogin->id);
            // // $request->session()->put('email', $userLogin->email);
            // // $request->session()->put('role', $userLogin->iec_code);
            $user = [
                'id'    => $userLogin->id,
                'name'  => $userLogin->impExpUser->name,
                'email' => $userLogin->email,
                'role'  => $userLogin->impExpUser->role->role_slug,
                'iec_code' => $userLogin->iec_code,
                'designation' => $userLogin->impExpUser->designation

            ];
            return response()->json([
                'status' => true,
                // 'role'  => $roleSlug,
                'token'  => $token,
                'user'   => $user
            ], 200);
        } catch (\Exception $e) {
            Log::error("LOGIN API ERROR", [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ]);

            return response()->json([
                'status' => false,
                'msg'    => 'Something went wrong, please try again later.',
                'error'  => $e->getMessage()
            ], 500);
        }
    }



    public function loginImpExp(Request $request)
    {
        try {
            Log::info("LOGIN API HIT", [
                'iec_code' => $request->iec_code,
                'ip' => $request->ip()
            ]);
            $request->validate([
                'iec_code' => 'required',
                'password' => 'required',
            ]);

            $userLogin = ImpExpUserLogin::with('impExpUser.role')
                ->where('iec_code', $request->iec_code)
                ->first();

            // if (!$userLogin) {
            //     return response()->json(['status' => false, 'msg' => 'Invalid credentials'], 401);
            // }
            if (!$userLogin || !$userLogin->impExpUser) {
                return response()->json([
                    'status' => false,
                    'msg'    => 'The Iec Code or Password is Incorrect. Please try again.'
                ], 401);
            }
            if (!hash_equals($userLogin->password, hash('sha256', $request->password))) {
                //return response()->json(['status' => false, 'msg' => 'Invalid credentials'], 401);
                Log::warning("LOGIN FAILED - Wrong password", [
                    'iec_code' => $request->iec_code,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'status' => false,
                    'msg'    => 'The Iec Code or Password is Incorrect. Please try again.'
                ], 401);
            }
            $token = auth('impexp_api')->login($userLogin);

            return response()->json([
                'status' => true,
                'token' => $token,
                'user' => [
                    'id' => $userLogin->id,
                    'iec_code' => $userLogin->iec_code,
                    'name' => $userLogin->impExpUser->name,
                    'role' => $userLogin->impExpUser->role->role_slug,
                    'designation' => $userLogin->impExpUser->designation
                ]
            ], 200);
        } catch (\Exception $e) {
            Log::error("LOGIN API ERROR", [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ]);

            return response()->json([
                'status' => false,
                'msg'    => 'Something went wrong, please try again later.',
                'error'  => $e->getMessage()
            ], 500);
        }
    }
}
