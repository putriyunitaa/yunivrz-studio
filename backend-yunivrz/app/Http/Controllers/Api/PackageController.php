<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Package;

class PackageController extends Controller
{
    public function index(Request $request)
    {
        $query = Package::with('catalog')->where('is_active', true);

        if ($request->has('catalog_id')) {
            $query->where('catalog_id', $request->catalog_id);
        }

        $packages = $query->orderBy('sort_order')->get();

        return response()->json($packages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'catalog_id' => 'required|exists:catalogs,id',
            'name' => 'required|string|max:100',
            'price' => 'required|numeric',
            'features' => 'required|array',
        ]);

        $package = Package::create($request->all());

        return response()->json($package, 201);
    }

    public function show(string $id)
    {
        $package = Package::with('catalog')->findOrFail($id);
        return response()->json($package);
    }

    public function update(Request $request, string $id)
    {
        $package = Package::findOrFail($id);

        $request->validate([
            'catalog_id' => 'sometimes|required|exists:catalogs,id',
            'name' => 'sometimes|required|string|max:100',
            'price' => 'sometimes|required|numeric',
            'features' => 'sometimes|required|array',
        ]);

        $package->update($request->all());

        return response()->json($package);
    }

    public function destroy(string $id)
    {
        $package = Package::findOrFail($id);
        $package->delete();

        return response()->json(['message' => 'Package deleted successfully']);
    }
}
