<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProjectRevision;
use App\Models\ProjectLog;
use App\Models\Project;

class ProjectRevisionController extends Controller
{
    public function index(Request $request)
    {
        $query = ProjectRevision::with(['project', 'user']);

        if ($request->user() && $request->user()->role->name === 'client') {
            $query->whereHas('project', function($q) use ($request) {
                $q->where('user_id', $request->user()->id);
            });
        }
        
        if ($request->has('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        $revisions = $query->orderBy('created_at', 'desc')->get();
        return response()->json($revisions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'content' => 'required|string',
            'attachments' => 'nullable|array',
            'preview_url' => 'nullable|url'
        ]);

        $project = Project::findOrFail($request->project_id);

        if ($request->user()->role->name === 'client' && $project->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $lastRevision = ProjectRevision::where('project_id', $project->id)->max('revision_number') ?? 0;

        $revision = ProjectRevision::create([
            'project_id' => $project->id,
            'user_id' => $request->user()->id,
            'revision_number' => $lastRevision + 1,
            'content' => $request->content,
            'attachments' => $request->attachments,
            'preview_url' => $request->preview_url
        ]);

        // Create a log entry
        ProjectLog::create([
            'project_id' => $project->id,
            'user_id' => $request->user()->id,
            'action' => 'revision_requested',
            'description' => 'Revisi #' . ($lastRevision + 1) . ' diajukan: ' . substr($request->content, 0, 50) . '...',
            'metadata' => ['revision_id' => $revision->id]
        ]);

        return response()->json($revision->load('user'), 201);
    }

    public function show(string $id, Request $request)
    {
        $revision = ProjectRevision::with(['project', 'user'])->findOrFail($id);

        if ($request->user() && $request->user()->role->name === 'client') {
            if ($revision->project->user_id !== $request->user()->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        return response()->json($revision);
    }
}
