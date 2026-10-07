<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProjectLog;
use App\Models\Project;

class ProjectLogController extends Controller
{
    public function index(Request $request)
    {
        $query = ProjectLog::with('user');

        if ($request->has('project_id')) {
            $query->where('project_id', $request->project_id);

            // Access control for client
            if ($request->user() && $request->user()->role->name === 'client') {
                $project = Project::findOrFail($request->project_id);
                if ($project->user_id !== $request->user()->id) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }
            }
        } else if ($request->user() && $request->user()->role->name === 'client') {
            $query->whereHas('project', function($q) use ($request) {
                $q->where('user_id', $request->user()->id);
            });
        }

        $logs = $query->orderBy('created_at', 'desc')->get();
        return response()->json($logs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'action' => 'required|string|max:100',
            'description' => 'required|string',
            'metadata' => 'nullable|array'
        ]);

        $project = Project::findOrFail($request->project_id);
        
        // Admin or assigned client can log (but usually admin logs actions)
        if ($request->user()->role->name === 'client' && $project->user_id !== $request->user()->id) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $log = ProjectLog::create([
            'project_id' => $project->id,
            'user_id' => $request->user()->id,
            'action' => $request->action,
            'description' => $request->description,
            'metadata' => $request->metadata
        ]);

        return response()->json($log, 201);
    }
}
