<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\QuantityofVolume;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class QuantityofVolumeController extends Controller
{
    public function index()
    {
        $allData = QuantityofVolume::all();
        return response()->json([
            'success' => true,
            'data' => $allData
        ]);
    }

    public function createQtyVolume(Request $request)
    {
        DB::beginTransaction();

        try {
            $request->validate([
                'name'  => 'required|string|max:255',
                'value' => 'required|string|max:255',
            ]);

            $createData = new QuantityofVolume();
            $createData->name  = $request->name;
            $createData->value = $request->value;
            $createData->save();

            Log::channel('user_access')->info('Data created successfully.', [
                'name' => $createData->name,
                'creation_date' => now()->toDateTimeString()
            ]);

            DB::commit();
            return response()->json([
                'message' => 'HS Code created successfully!',
                'data' => $createData,
            ], 201);
        } catch (\Exception $e) {

            DB::rollBack();
            Log::channel('user_access')->error('Error creating Data.', [
                'error_message' => $e->getMessage(),
                'creation_date' => now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to create Data. Please try again later.',
            ], 500);
        }
    }
    public function showQtyVolumeData($id)
    {
        return QuantityofVolume::findOrFail($id);
    }
    public function updateQtyVolume(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'name'  => 'required|string|max:255',
                'value' => 'required|string|max:255',
            ]);

            $updateData = QuantityofVolume::findOrFail($id);

            $updateData->name  = $request->name;
            $updateData->value = $request->value;
            $updateData->update();
            DB::commit();

            Log::channel('user_access')->info('Data has been updated successfully!', [
                'id'         => $updateData->id,
                'name'       => $updateData->name,
                'status'     => $updateData->status,
                'updated_at' => Carbon::now()->toDateTimeString(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data has been updated successfully!',
                'data'    => $updateData,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::channel('user_access')->error('Error updating data.', [
                'error_message' => $e->getMessage(),
                'datetime'      => Carbon::now()->toDateTimeString(),
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to update data. Please try again later.',
            ], 500);
        }
    }
    public function statusQtyVolume($id)
    {
        try {
            $stData = QuantityofVolume::findOrFail($id);
            $stData->status = $stData->status == 1 ? 0 : 1;
            $stData->save();

            Log::channel('user_access')->info('Data status updated successfully.', [
                'id' => $stData->id,
                'name' => $stData->name,
                'updated_status' => $stData->status,
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Status updated successfully.',
                'status' => $stData->status
            ], 200);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error updating data status.', [
                'error_message' => $e->getMessage(),
                'failed_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to update Data status. Please try again later.',
            ], 500);
        }
    }
    public function deleteQtyVolume($id)
    {
        try {
            $delData = QuantityofVolume::findOrFail($id);
            $delData->delete();

            Log::channel('user_access')->info('Data deleted.', [
                'id' => $delData->id,
                'deleted_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json(['message' => 'Data deleted successfully.']);
        } catch (\Exception $e) {
            Log::channel('user_access')->error('Data deletion failed.', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to delete Data.'], 500);
        }
    }
}
