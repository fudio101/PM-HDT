<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\ComicEpisodeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ComicController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('password.update');
});

Route::apiResource('users', UserController::class);
Route::apiResource('authors', AuthorController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('comics', ComicController::class);
Route::get('comics/categories/{category}', [ComicController::class, 'showCategory']);
Route::apiResource('comic-episodes', ComicEpisodeController::class);
//Route::get('comic-episodes/images/{comicEpisode}', [ComicEpisodeController::class, 'getImages']);
Route::get('get-comic/{comic:slug}', [ComicController::class, 'getComic']);
Route::get('get-episode/{comic:slug}/{episode_number}', [ComicController::class, 'showEpisodeImages']);
Route::get('search', [ComicController::class, 'search']);
Route::get('get-just-updated-comics', [ComicController::class, 'getJustUpdatedComics']);
Route::get('get-comics-by-category/{category}', [ComicController::class, 'getComicsByCategory']);
