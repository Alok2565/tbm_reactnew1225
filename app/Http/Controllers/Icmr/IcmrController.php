<?php

namespace App\Http\Controllers\Icmr;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IcmrController extends Controller
{
    public function indexIcmr()
    {
        // return response()->json([
        //     'status' => true,
        //     'message' => 'Imp EXP dashboard access granted',

        // ]);
        $tiles = [
            ['title' => 'Total Exporters Registered', 'count' => 22, 'type' => 'count', 'color' => '#00d11a94'],
            ['title' => 'Fresh Applications Received', 'count' => 9, 'type' => 'count', 'color' => '#688A22'],
            ['title' => 'Applications with Committee Member', 'count' => 3, 'type' => 'count', 'color' => '#00d197'],
            ['title' => 'NOC Issued', 'count' => 6, 'type' => 'count', 'color' => '#F78800'],
            ['title' => 'Applications denied NOC', 'count' => 2, 'type' => 'count', 'color' => '#D12E00'],
        ];

        return response()->json([
            'status' => true,
            'data' => $tiles
        ]);
    }
}
