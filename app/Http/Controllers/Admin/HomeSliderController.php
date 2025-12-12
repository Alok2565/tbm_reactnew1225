<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\HomeSliderRequest;
use App\Models\HomeSlider;

class HomeSliderController extends Controller
{
    public function index()
    {
        $homeSlider = HomeSlider::all();

        return response()->json([
            'success' => true,
            'data' => $homeSlider
        ]);
    }

    public function createBannerSlider(HomeSliderRequest $request)
    {
        try {

            $data = $request->validated();
            if ($request->hasFile('image')) {
                $fileName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('uploads/slider'), $fileName);
                $data['image'] = $fileName;
            }
            $homeSlider = HomeSlider::create($data);
            Log::channel('user_access')->info('Banner created successfully.', [
                'banner_id' => $homeSlider->id,
                'banner_name' => $homeSlider->banner_title,
                'creation_date' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Banner has been created successfully!',
                'banner' => $homeSlider,
            ], 201);
        } catch (Exception $e) {

            Log::channel('user_access')->error('Error creating Banner.', [
                'error_message' => $e->getMessage(),
                'creation_date' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create Banner. Please try again later.',
            ], 500);
        }
    }
    public function showSliderData($id)
    {
        return HomeSlider::findOrFail($id);
    }
    public function updateSlider(HomeSliderRequest $request, string $id)
    {
        try {

            $data = $request->validated();
            $homeSlider = HomeSlider::findOrFail($id);
            if ($request->hasFile('image')) {
                if ($homeSlider->image && file_exists(public_path('uploads/slider/' . $homeSlider->image))) {
                    unlink(public_path('uploads/slider/' . $homeSlider->image));
                }

                $fileName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('uploads/slider'), $fileName);

                $data['image'] = $fileName;
            }
            $homeSlider->update($data);

            Log::channel('user_access')->info('Slider has been updated successfully!', [
                'banner_id' => $homeSlider->id,
                'banner_title' => $homeSlider->banner_title,
                'status' => $homeSlider->status,
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Slider has been updated successfully!',
                'banner' => $homeSlider,
            ], 200);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error updating Slider.', [
                'error_message' => $e->getMessage(),
                'datetime' => Carbon::now()->toDateTimeString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to update slider. Please try again later.',
            ], 500);
        }
    }
    public function statusSlider($id)
    {
        try {
            $homeSlider = HomeSlider::findOrFail($id);
            $homeSlider->status = $homeSlider->status == 1 ? 0 : 1;
            $homeSlider->save();

            Log::channel('user_access')->info('Slider status updated successfully.', [
                'banner_id' => $homeSlider->id,
                'banner_title' => $homeSlider->banner_title,
                'updated_status' => $homeSlider->status,
                'updated_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Status updated successfully.',
                'status' => $homeSlider->status
            ], 200);
        } catch (Exception $e) {
            Log::channel('user_access')->error('Error updating Slider status.', [
                'error_message' => $e->getMessage(),
                'failed_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json([
                'message' => 'Failed to update Slider status. Please try again later.',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteSlider(string $id)
    {
        try {
            $homeSlider = HomeSlider::findOrFail($id);
            $homeSlider->delete();

            Log::channel('user_access')->info('Slider deleted.', [
                'banner_id' => $homeSlider->id,
                'deleted_at' => Carbon::now()->toDateTimeString()
            ]);

            return response()->json(['message' => 'Slider deleted successfully.']);
        } catch (\Exception $e) {
            Log::channel('user_access')->error('Slider deletion failed.', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to delete Slider.'], 500);
        }
    }
}
