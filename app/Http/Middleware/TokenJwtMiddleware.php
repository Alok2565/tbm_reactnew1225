<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class TokenJwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, $guard)
    {
        //Log::info("token middleware call it");
        if (!auth($guard)->check()) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }

        return $next($request);
    }
    // public function handle($request, Closure $next)
    // {
    //     Log::info("token middleware call it");
    //     try {
    //         $user = JWTAuth::parseToken()->authenticate();
    //     } catch (TokenExpiredException $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Token expired'
    //         ], 401);
    //     } catch (TokenInvalidException $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Token invalid'
    //         ], 401);
    //     } catch (JWTException $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Token not provided'
    //         ], 401);
    //     }

    //     return $next($request);
    // }
}
