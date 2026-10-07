<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;

use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\ProjectLogController;
use App\Http\Controllers\Api\ProjectRevisionController;

Route::post('/login', [AuthController::class, 'login']);

// Public catalog access
Route::get('/catalogs', [CatalogController::class, 'index']);
Route::get('/catalogs/{slug}', [CatalogController::class, 'show']);
Route::get('/packages', [PackageController::class, 'index']);
Route::get('/packages/{id}', [PackageController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user()->load('role');
    });

    // CRM Routes
    Route::apiResource('clients', ClientController::class);
    
    // Project Routes
    Route::apiResource('projects', ProjectController::class);
    
    // Project Logs & Revisions
    Route::apiResource('project-logs', ProjectLogController::class)->only(['index', 'store']);
    Route::apiResource('project-revisions', ProjectRevisionController::class)->except(['destroy']);
    
    // Invoice Routes
    Route::apiResource('invoices', InvoiceController::class);

    // Admin Catalog Management Routes (Create, Update, Delete)
    Route::post('/catalogs', [CatalogController::class, 'store']);
    Route::put('/catalogs/{id}', [CatalogController::class, 'update']);
    Route::delete('/catalogs/{id}', [CatalogController::class, 'destroy']);
    
    Route::post('/packages', [PackageController::class, 'store']);
    Route::put('/packages/{id}', [PackageController::class, 'update']);
    Route::delete('/packages/{id}', [PackageController::class, 'destroy']);
});
