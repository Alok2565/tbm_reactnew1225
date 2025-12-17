<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = auth('api')->user();

        if (!$user || !$user->role || !in_array($user->role->role_slug, $roles)) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized role access'
            ], 403);
        }

        return $next($request);
    }
}
