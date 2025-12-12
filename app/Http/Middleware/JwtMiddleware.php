<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return response()->json(['status' => false, 'msg' => 'Token expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['status' => false, 'msg' => 'Token invalid'], 401);
        } catch (Exception $e) {
            return response()->json(['status' => false, 'msg' => 'Token not provided'], 401);
        }

        $request->attributes->add(['auth_user' => $user]);

        return $next($request);
    }
}
