<?php

namespace App\Http\Controllers\Admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function indexAdmin()
    {
        return response()->json([
            'status' => true,
            'message' => 'Admin dashboard access granted',
            'user' => auth('api')->user()
        ]);
    }
}
