<?php

namespace App\Http\Controllers\imp_exp;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImpExpController extends Controller
{
    public function indexImpExp()
    {
        return response()->json([
            'status' => true,
            'message' => 'Imp EXP dashboard access granted',

        ]);
    }
}
