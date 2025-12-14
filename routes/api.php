<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RoleController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\Icmr\IcmrController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\PasswordSetupController;
use App\Http\Controllers\Admin\HomeSliderController;
use App\Http\Controllers\Admin\HsCodeController;
use App\Http\Controllers\Admin\NaturalBiomaterialController;
use App\Http\Controllers\Auth\ImpExpUserLoginController;
use App\Http\Controllers\Committee\CommitteeController;
use App\Http\Controllers\Auth\ImpExpUserRegisterController;
use App\Http\Controllers\Auth\UserLogoutController;

// routes/api.php
Route::get('/roles', [RoleController::class, 'index']);
Route::post('/role/create', [RoleController::class, 'createRole']);
Route::get('/roles/{id}', [RoleController::class, 'showRoleData']);
Route::put('/role/update/{id}', [RoleController::class, 'updateRole']);
Route::put('/role/status/{id}', [RoleController::class, 'statusRole']);
Route::delete('/role/delete/{id}', [RoleController::class, 'deleteRole']);

Route::get('/users', [UserController::class, 'index']);
Route::post('/user/create', [UserController::class, 'createUser']);
Route::get('/users/{id}', [UserController::class, 'showUserData']);
Route::put('/user/update/{id}', [UserController::class, 'updateUser']);
Route::put('/users/status/{id}', [UserController::class, 'statusUser']);
Route::delete('/users/delete/{id}', [UserController::class, 'deleteUser']);

Route::get('/hs_codes', [HsCodeController::class, 'index']);
Route::post('/hs_code/create', [HsCodeController::class, 'createHsCode']);
Route::get('/hs_codes/{id}', [HsCodeController::class, 'showHsCodeData']);
Route::put('/hs_code/update/{id}', [HsCodeController::class, 'updateHsCode']);
Route::put('/hs_code/status/{id}', [HsCodeController::class, 'statusHsCode']);
Route::delete('/hs_code/delete/{id}', [HsCodeController::class, 'deleteHsCode']);

Route::get('/natural_biomaterials', [NaturalBiomaterialController::class, 'index']);
Route::post('/natural_biomaterial/create', [NaturalBiomaterialController::class, 'createNaturalBiomaterial']);
Route::get('/natural_biomaterials/{id}', [NaturalBiomaterialController::class, 'showNaturalBiomaterialData']);
Route::put('/natural_biomaterial/update/{id}', [NaturalBiomaterialController::class, 'updateNaturalBiomaterial']);
Route::put('/natural_biomaterial/status/{id}', [NaturalBiomaterialController::class, 'statusNaturalBiomaterial']);
Route::delete('/natural_biomaterial/delete/{id}', [NaturalBiomaterialController::class, 'deleteNaturalBiomaterial']);

Route::get('/userlogin-data/{id}', [UserController::class, 'userLoginData']);
Route::put('/generate-password/{id}', [PasswordSetupController::class, 'generatePassword']);

//imp Exp
Route::post("impexp/submit/users/v2", [ImpExpUserRegisterController::class, "submitImpExpCode"]);
Route::get('/retrivedgft/users/v2', [ImpExpUserRegisterController::class, 'retriveDgftImpExp']);
Route::get('/impexp/users/v2', [ImpExpUserRegisterController::class, 'checkImpExpUser']);
Route::post('/impexp/user/register', [ImpExpUserRegisterController::class, 'registerImpExpUser']);

Route::get('/impexp-users', [ImpExpUserRegisterController::class, 'indexImpExpUser']);

Route::post('/impexp/login', [ImpExpUserLoginController::class, 'loginImpExp']);

//End Imp Exp

//ICMR and Committeee//
Route::post('/login', [LoginController::class, 'login']);

Route::post('/logout', [UserLogoutController::class, 'logoutUser']);
// Route::post('/logout', [LoginController::class, 'logout']);
// Route::middleware('jwt.verify')->group(function () {
//     Route::post('/logout', [UserLogoutController::class, 'logoutUser']);
// });
// Route::middleware(['jwt.verify'])->group(function () {
//     Route::get('/admin/dashboard',     [AdminController::class, 'index']);
//     Route::get('/icmr/dashboard',      [IcmrController::class, 'index']);
//     Route::get('/committee/dashboard', [CommitteeController::class, 'index']);
// });

Route::get('/sliders', [HomeSliderController::class, 'index']);
Route::post('/slider/create', [HomeSliderController::class, 'createBannerSlider']);
Route::get('/sliders/{id}', [HomeSliderController::class, 'showSliderData']);
Route::put('/slider/update/{id}', [HomeSliderController::class, 'updateSlider']);
Route::put('/slider/status/{id}', [HomeSliderController::class, 'statusSlider']);
Route::delete('/slider/delete/{id}', [HomeSliderController::class, 'deleteSlider']);
