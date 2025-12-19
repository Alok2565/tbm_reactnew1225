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
    public function handle(Request $request, Closure $next, $guard, ...$roles)
    {
        //\Illuminate\Support\Facades\Log::info('Role middleware hit');
        $login = auth($guard)->user();

        if (!$login) {
            return response()->json(['status' => false, 'message' => 'Unauthenticated'], 401);
        }
        $role = null;
        if ($guard === 'user_api') {
            $role = $login->user->role->role_slug ?? null;
        }
        if ($guard === 'impexp_api') {
            $role = $login->impExpUser->role->role_slug ?? null;
        }
        if (!in_array($role, $roles)) {
            return response()->json(['status' => false, 'message' => 'Unauthorized'], 403);
        }
        return $next($request);
    }
    // public function handle(Request $request, Closure $next, ...$roles)
    // {
    //     \Illuminate\Support\Facades\Log::info('Role middleware hit');
    //     $user = auth('api')->user();

    //     if (!$user) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Unauthenticated'
    //         ], 401);
    //     }

    //     if (!$user->role || !in_array($user->role->role_slug, $roles)) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Unauthorized role access'
    //         ], 403);
    //     }

    //     return $next($request);
    // }
}
