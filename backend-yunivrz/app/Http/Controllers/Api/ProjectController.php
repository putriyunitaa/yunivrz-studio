<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     */
    public function index(Request $request)
    {
        $query = Project::with(['client']);

        // Jika user yang login adalah client, hanya tampilkan project mereka
        if ($request->user() && $request->user()->role->name === 'client') {
            $query->where('user_id', $request->user()->id);
        }

        $projects = $query->latest()->get();

        return response()->json($projects);
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'brief' => 'nullable|string',
            'catalog_id' => 'nullable|exists:catalogs,id',
            'package_id' => 'nullable|exists:packages,id',
            'deadline' => 'nullable|date',
        ]);

        // Generate unique project code
        $projectCode = 'PRJ-' . strtoupper(Str::random(6));
        while (Project::where('project_code', $projectCode)->exists()) {
            $projectCode = 'PRJ-' . strtoupper(Str::random(6));
        }

        $project = Project::create([
            'user_id' => $request->user_id,
            'catalog_id' => $request->catalog_id,
            'package_id' => $request->package_id,
            'project_code' => $projectCode,
            'title' => $request->title,
            'brief' => $request->brief,
            'status' => 'pending',
            'progress_percent' => 0,
            'deadline' => $request->deadline,
        ]);

        return response()->json($project->load('client'), 201);
    }

    /**
     * Display the specified project.
     */
    public function show(string $id, Request $request)
    {
        $project = Project::with('client')->findOrFail($id);

        if ($request->user() && $request->user()->role->name === 'client') {
            if ($project->user_id !== $request->user()->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        return response()->json($project);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'brief' => 'nullable|string',
            'status' => 'sometimes|required|in:pending,in_progress,revision,review,completed,cancelled',
            'progress_percent' => 'sometimes|required|integer|min:0|max:100',
            'deadline' => 'nullable|date',
            'live_url' => 'nullable|url',
            'admin_notes' => 'nullable|string',
        ]);

        if ($request->has('status') && $request->status === 'in_progress' && !$project->started_at) {
            $request->merge(['started_at' => now()]);
        }

        if ($request->has('status') && $request->status === 'completed' && !$project->completed_at) {
            $request->merge(['completed_at' => now(), 'progress_percent' => 100]);
        }

        $project->update($request->all());

        return response()->json($project->load('client'));
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
