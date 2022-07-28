<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->group(function () {
    Route::get('user', function (Request $request) {
        if (Auth::guard('api')->check()) {
            return response()->json($request->user());
        }

        if (($user = Auth::user()) !== null) {
            return response()->json($user);
        }

        return response()->status(401);
    });

    Route::apiResource('contacts', ContactController::class);
});

