<?php

namespace App\Http\Controllers\Icmr;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IcmrController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => true,
            'msg' => 'ICMR dashboard loaded successfully'
        ]);
        dd("check ICMR dahboard");
    }
}
