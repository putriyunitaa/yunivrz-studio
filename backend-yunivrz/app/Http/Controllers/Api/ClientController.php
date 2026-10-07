<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;

class ClientController extends Controller
{
    /**
     * Display a listing of the clients.
     */
    public function index()
    {
        // Get role ID for 'client'
        $clientRole = Role::where('name', 'client')->first();
        
        if (!$clientRole) {
            return response()->json([]);
        }

        $clients = User::where('role_id', $clientRole->id)
            ->withCount('projects') // Assuming there is a relation to projects, can be adjusted later
            ->get();

        return response()->json($clients);
    }

    /**
     * Store a newly created client in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
        ]);

        $clientRole = Role::where('name', 'client')->first();

        $client = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'role_id' => $clientRole->id,
            'is_active' => true,
        ]);

        return response()->json($client, 201);
    }

    /**
     * Display the specified client.
     */
    public function show(string $id)
    {
        $client = User::with('role')->findOrFail($id);
        
        // Ensure the user is actually a client
        if ($client->role->name !== 'client') {
            return response()->json(['message' => 'User is not a client'], 404);
        }

        return response()->json($client);
    }

    /**
     * Update the specified client in storage.
     */
    public function update(Request $request, string $id)
    {
        $client = User::findOrFail($id);
        
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,'.$client->id,
            'password' => 'sometimes|required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'is_active' => 'boolean'
        ]);

        if ($request->has('password')) {
            $request->merge(['password' => bcrypt($request->password)]);
        }

        $client->update($request->all());

        return response()->json($client);
    }

    /**
     * Remove the specified client from storage.
     */
    public function destroy(string $id)
    {
        $client = User::findOrFail($id);
        $client->delete();

        return response()->json(['message' => 'Client deleted successfully']);
    }
}
