<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Catalog;

class CatalogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Catalog::with('packages')->where('is_active', true);

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $catalogs = $query->orderBy('sort_order')->get();

        return response()->json($catalogs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:catalogs,slug|max:255',
            'category' => 'required|in:micro_moments,milestones,custom_solutions',
            'description' => 'required|string',
            'thumbnail' => 'required|string',
            'features' => 'required|array',
        ]);

        $catalog = Catalog::create($request->all());

        return response()->json($catalog, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        // Allow fetching by ID or Slug
        $catalog = Catalog::with('packages')
            ->where('slug', $slug)
            ->orWhere('id', $slug)
            ->firstOrFail();

        return response()->json($catalog);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $catalog = Catalog::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:catalogs,slug,' . $id,
            'category' => 'sometimes|required|in:micro_moments,milestones,custom_solutions',
            'description' => 'sometimes|required|string',
            'thumbnail' => 'sometimes|required|string',
            'features' => 'sometimes|required|array',
        ]);

        $catalog->update($request->all());

        return response()->json($catalog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $catalog = Catalog::findOrFail($id);
        $catalog->delete();

        return response()->json(['message' => 'Catalog deleted successfully']);
    }
}
