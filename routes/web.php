<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Front\HomeController;
use App\Http\Controllers\PasswordSetupController;

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/{any}', [HomeController::class, 'index'])->where('any', '.*')->name('homepage');
Route::get('/{any}', [HomeController::class, 'index'])
    ->where('any', '^(?!api).*$')
    ->name('homepage');


Route::get('/password/setup/{id}', [PasswordSetupController::class, 'showPasswordForm'])
    ->name('password.setup')
    ->middleware('signed');
// Route::get('/{any}', function () {
//     return view('thbm.main_layout');
// })->where('any', '^(?!api).*$'); 