<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PurposeSampleStorage;
use Illuminate\Http\Request;

class PurposeSampleStorageController extends Controller
{
    public function index()
    {

        $allData = PurposeSampleStorage::all();
        return response()->json([
            'success' => true,
            'data' => $allData,
        ], 200);
    }

    public function createPurposeSampleStorage(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'value' => 'required'
        ]);

        $createData = new PurposeSampleStorage();
        $createData->name = $request->name;
        $createData->value = $request->value;
        $createData->save();

        return response()->json([
            'success' => true,
            'data' => $createData,
        ], 200);
    }


    public function showPurposeSampleStorageData($id)
    {
        return PurposeSampleStorage::findorFail($id);
    }

    public function updatePurposeSampleStorage(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'value' => 'required',

        ]);
        $updateData = PurposeSampleStorage::findorFail($id);
        $updateData->name = $request->name;
        $updateData->value = $request->value;
        $updateData->update();
        return response()->json([
            'success' => true,
            'data' => $updateData,
        ]);
    }

    public function statusPurposeSampleStorage()
    {
        return "Status of Sample Controller";
    }


    public function deletePurposeSampleStorage()
    {
        return "Delete of Sample Controller";
    }
}
