<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use App\Models\Role;
use App\Models\DgftBranch;
use App\Models\ImpExpUser;
use App\Models\DgftDirector;
use Illuminate\Http\Request;
use App\Models\DgftImpExpUser;
use App\Models\ImpExpUserLogin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\ImpExpUserRequest;
use App\Mail\ImpExpGeneratePasswordLlinkMail;

class ImpExpUserRegisterController extends Controller
{

    public function indexImpExpUser()
    {
        return "Iec HolderList";
    }

    // STEP 1: Validate IEC Code + Fetch DGFT Data
    public function submitImpExpCode(Request $request)
    {
        $request->validate([
            "iec_code" => "required|string|max:10"
        ]);

        $iec_code = $request->iec ?? $request->iec_code;
        // $exists = $this->checkImpExpUser($request);
        $dgftData = $this->retriveDgftImpExp($request);
        if (!$dgftData) {
            return response()->json([
                "status" => false,
                "message" => "Invalid IEC Code - DGFT record not found"
            ], 404);
        }
        $exists = ImpExpUser::where("iec_code", $iec_code)->exists();
        if ($exists) {
            return response()->json([
                "status" => false,
                "message" => "This IEC Code is already registered"
            ], 409);
        }
        return response()->json([
            "status" => true,
            "message" => "IEC Code Valid",
            "data" => $dgftData
        ]);
    }

    public function retriveDgftImpExp(Request $request)
    {
        try {

            $iec_code = $request->iec ?? $request->iec_code;

            if (!$iec_code) {
                return response()->json([
                    "status" => false,
                    "message" => "IEC Code missing"
                ], 400);
            }

            $record = DgftImpExpUser::where("iec", $iec_code)->first();
            // Fetch related directors
            // $directors = DgftDirector::where('dgft_user_id', $record->id)->get()
            //     ->map(fn($d) => ['name' => $d->name])
            //     ->toArray();
            // // Fetch related branches
            // $branches = DgftBranch::where('dgft_user_id', $record->id)->get()
            //     ->map(fn($d) => ['branch_code' => $d->branch_code, 'branch_addr1' => $d->branch_addr1, 'branch_addr2' => $d->branch_addr2, 'city' => $d->city, 'state' => $d->state, 'pincode' => $d->pincode,])
            //     ->toArray();

            $branchOrDirect = DgftImpExpUser::with([
                'directors:name,dgft_user_id',
                'branches:branch_code,branch_addr1,branch_addr2,city,state,pincode,dgft_user_id'
            ])->find($record->id);

            $directors = $branchOrDirect->directors->toArray();
            $branches  = $branchOrDirect->branches->toArray();
            if (!$record) {
                return response()->json([
                    "status" => false,
                    "message" => "DGFT record not found"
                ], 404);
            }
            $respData = [
                'iec' => $record->iec,
                'entityName' => $record->entityName,
                'addressLine1' => $record->addressLine1,
                'addressLine2' => $record->addressLine2,
                'city' => $record->city,
                'state' => $record->state,
                'pin' => $record->pin,
                'contactNo' => $record->contactNo,
                'email' => $record->email,
                'iecIssueDate' => $record->iecIssueDate,
                'exporterType' => $record->exporterType,
                'pan' => $record->pan,
                'iecStatus' => $record->iecStatus,
                'starStatus' => $record->starStatus,
                'iecModificationDate' => $record->iecModificationDate,
                'dataAsOn' => $record->dataAsOn,
                'natureOfConcern' => $record->natureOfConcern,
                'directors' => $directors,
                'branches' => $branches,
            ];
            return response()->json([
                "status" => true,
                "message" => "DGFT Data Found",
                "data" => $respData
            ]);
        } catch (\Exception $e) {

            Log::error("DGFT fetch error", [
                "iec" => $iec_code,
                "error" => $e->getMessage()
            ]);

            return response()->json([
                "status" => false,
                "message" => "Server Error"
            ], 500);
        }
    }

    public function checkImpExpUser(Request $request)
    {
        try {
            $iec_code = $request->iec_code;

            $exists = ImpExpUser::where("iec_code", $iec_code)->first();
            //dd($iec_code);
            return response()->json([
                "exists" => !!$exists,
                "data" => $exists
            ]);
        } catch (\Exception $e) {
            Log::error("Check IEC existence error", [
                "iec_code" => $iec_code,
                "error" => $e->getMessage(),
                "file" => $e->getFile(),
                "line" => $e->getLine(),
                "trace" => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Error occurred while checking IEC existence.'
            ], 500);
        }
    }
    public function registerImpExpUser(ImpExpUserRequest $request)
    {
        DB::beginTransaction();

        try {
            // Create the user
            $roleData = Role::where('role_slug', 'imp-exp')->first();
            if (!$roleData) {
                return response()->json([
                    'message' => 'Role "imp-exp" not found.'
                ], 404);
            }
            $iecUser = ImpExpUser::create($request->validated());
            $iecUser->role_id = $roleData->id ?? NUll;
            $iecUser->ip_address    = $request->ip();
            $iecUser->save();
            if (!$roleData) {
                Log::error('Role "imp-exp" not found.');
                DB::rollBack();
                return response()->json([
                    'message' => 'Role "imp-exp" not found.'
                ], 404);
            }
            $impExpLogin = new ImpExpUserLogin();
            $impExpLogin->impexp_user_id    = $iecUser->id;
            $impExpLogin->role_id           = $roleData->id ?? NUll;
            $impExpLogin->iec_code          = $iecUser->iec_code;
            $impExpLogin->email             = $iecUser->email;
            $impExpLogin->validity_status   = 'true';
            $impExpLogin->ip_address        = $request->ip();
            //dd($impExpLogin);
            $impExpLogin->save();
            // Generate signed URL (valid 60 min)
            $signedUrl = \Illuminate\Support\Facades\URL::temporarySignedRoute(
                'password.setup',
                now()->addMinutes(60),
                ['id' => $iecUser->id]
            );
            try {
                Mail::to($impExpLogin->email)->send(new ImpExpGeneratePasswordLlinkMail($signedUrl));
            } catch (\Exception $e) {
                Log::error("Mail Failed", [
                    "error" => $e->getMessage(),
                    "file" => $e->getFile(),
                    "line" => $e->getLine(),
                    "trace" => $e->getTraceAsString(),
                    "email" => $impExpLogin->email
                ]);
            }
            DB::commit();

            return response()->json([
                'message' => 'User has been created successfully!',
                'user'    => $iecUser,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error("ImpExpUser Registration Error", [
                "error"   => $e->getMessage(),
                "file"    => $e->getFile(),
                "line"    => $e->getLine(),
                "trace"   => $e->getTraceAsString(),
                "request" => $request->all(),
            ]);

            return response()->json([
                'message' => 'Failed to create user.'
            ], 500);
        }
    }
}
