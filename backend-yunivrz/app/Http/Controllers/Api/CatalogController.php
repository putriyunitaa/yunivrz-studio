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
        $query = Catalog::with('packages');

        // Only filter by active if not requested all/admin
        if (!$request->boolean('all') && !$request->has('admin')) {
            $query->where('is_active', true);
        }

        if ($request->has('category') && !empty($request->category) && $request->category !== 'Semua' && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $catalogs = $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc')->get();

        return response()->json($catalogs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:catalogs,slug',
            'category' => 'required|string|in:micro_moments,milestones,custom_solutions',
            'description' => 'required|string',
            'thumbnail' => 'nullable|string',
            'images' => 'nullable|array',
            'features' => 'nullable|array',
            'preview_url' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $slug = $request->slug;
        if (empty($slug)) {
            $slug = \Illuminate\Support\Str::slug($request->title);
            // Check uniqueness
            $count = Catalog::where('slug', 'LIKE', "{$slug}%")->count();
            if ($count > 0) {
                $slug .= '-' . ($count + 1);
            }
        }

        $data = $request->all();
        $data['slug'] = $slug;
        $data['thumbnail'] = $request->thumbnail ?: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80';
        $data['features'] = is_array($request->features) ? $request->features : [];
        $data['images'] = is_array($request->images) ? $request->images : [];
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_active'] = $request->has('is_active') ? $request->boolean('is_active') : true;

        $catalog = Catalog::create($data);

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
            'slug' => 'sometimes|nullable|string|max:255|unique:catalogs,slug,' . $id,
            'category' => 'sometimes|required|string|in:micro_moments,milestones,custom_solutions',
            'description' => 'sometimes|required|string',
            'thumbnail' => 'sometimes|nullable|string',
            'images' => 'sometimes|nullable|array',
            'features' => 'sometimes|nullable|array',
            'preview_url' => 'sometimes|nullable|string',
            'is_featured' => 'sometimes|nullable|boolean',
            'is_active' => 'sometimes|nullable|boolean',
            'sort_order' => 'sometimes|nullable|integer',
        ]);

        $data = $request->all();

        if ($request->has('title') && empty($request->slug) && empty($catalog->slug)) {
            $data['slug'] = \Illuminate\Support\Str::slug($request->title);
        }

        if ($request->has('features') && !is_array($request->features)) {
            $data['features'] = [];
        }

        if ($request->has('is_featured')) {
            $data['is_featured'] = $request->boolean('is_featured');
        }

        if ($request->has('is_active')) {
            $data['is_active'] = $request->boolean('is_active');
        }

        $catalog->update($data);

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
