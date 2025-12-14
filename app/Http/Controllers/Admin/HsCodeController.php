<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Carbon\Carbon;
use App\Models\HsCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class HsCodeController extends Controller
{
    public function index()
    {
        $allData = HsCode::all();

        return response()->json([
            'success' => true,
            'data' => $allData
        ]);
    }

    public function createHsCode(Request $request)
    {
        DB::beginTransaction();

        try {
            $request->validate([
                'hs_code'  => 'required|string|max:255',
                'desc' => 'required|string|max:255',
            ]);

            $createData = new HsCode();
            $createData->hs_code  = $request->hs_code;
            $createData->desc = $request->desc;
            $createData->save();

            Log::channel('user_access')->info('HS Code created successfully.', [
                'name' => $createData->hs_code,
                'creation_date' => now()->toDateTimeString()
            ]);

            DB::commit(); // ✅ commit transaction

            return response()->json([
                'message' => 'HS Code created successfully!',
                'data' => $createData,
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack(); // ❌ rollback on error

            Log::channel('user_access')->error('Error creating HS Code.', [
                'error_message' => $e->getMessage(),
                'creation_date' => now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to create HS Code. Please try again later.',
            ], 500);
        }
    }


    public function showHsCodeData($id)
    {
        return HsCode::findOrFail($id);
    }
    public function updateHsCode(Request $request, string $id)
    {
        try {
            $codeData = HsCode::findOrFail($id);

            $codeData->hs_code = $request->hs_code;
            $codeData->desc = $request->desc;
            $codeData->save();

            Log::channel('user_access')->info('Hs Code has been updated successfully!', [
                'id' => $codeData->id,
                'HsCode_name' => $codeData->hs_code,
                'status' => $codeData->status,
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Hs Code has been updated successfully!',
                'HsCode' => $codeData,
            ], 200);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error updating code.', [
                'error_message' => $e->getMessage(),
                'datetime' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to update code. Please try again later.',
            ], 500);
        }
    }
    public function statusHsCode($id)
    {
        try {
            $codeData = HsCode::findOrFail($id);
            $codeData->status = $codeData->status == 1 ? 0 : 1;
            $codeData->save();

            Log::channel('user_access')->info('HsCode status updated successfully.', [
                'HsCode_id' => $codeData->id,
                'HsCode_name' => $codeData->HsCode_name,
                'updated_status' => $codeData->status,
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Status updated successfully.',
                'status' => $codeData->status
            ], 200);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error updating HsCode status.', [
                'error_message' => $e->getMessage(),
                'failed_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to update HsCode status. Please try again later.',
            ], 500);
        }try {
            $codeData = HsCode::findOrFail($id);
            $codeData->delete();

            Log::channel('user_access')->info('HsCode deleted.', [
                'HsCode_id' => $codeData->id,
                'deleted_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json(['message' => 'HsCode deleted successfully.']);
        } catch (\Exception $e) {
            Log::channel('user_access')->error('HsCode deletion failed.', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to delete HsCode.'], 500);
        }
    }

    public function deleteHsCode($id)
    {
        try {
            $codeData = HsCode::findOrFail($id);
            $codeData->delete();

            Log::channel('user_access')->info('HsCode deleted.', [
                'HsCode_id' => $codeData->id,
                'deleted_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json(['message' => 'HsCode deleted successfully.']);
        } catch (\Exception $e) {
            Log::channel('user_access')->error('HsCode deletion failed.', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to delete HsCode.'], 500);
        }
    }
    
     
}
