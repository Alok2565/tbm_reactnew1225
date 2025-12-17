<?php

namespace App\Http\Controllers\Committee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommitteeController extends Controller
{
    public function index()
    {
        $tiles = [
            ['title' => 'Fresh Applications Received for Comments', 'count' => 7, 'type' => 'count', 'color' => '#688A22'],
            ['title' => 'Applications with Comments Sent to ICMR', 'count' => 4, 'type' => 'count', 'color' => '#67707F'],
            ['title' => 'Applications with Decision', 'count' => 2, 'type' => 'count', 'color' => '#F78800'],
        ];

        return response()->json([
            'status' => true,
            'data' => $tiles
        ]);
    }
}
