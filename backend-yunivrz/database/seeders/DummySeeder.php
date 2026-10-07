<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Project;
use Illuminate\Support\Facades\Hash;

class DummySeeder extends Seeder
{
    public function run(): void
    {
        $role = Role::where('name', 'client')->first();
        if (!$role) return;

        $user = User::firstOrCreate(
            ['email' => 'client@yunivrz.com'],
            [
                'name' => 'Anindya Putri',
                'password' => Hash::make('password'),
                'role_id' => $role->id,
                'phone' => '081234567890'
            ]
        );

        Project::firstOrCreate(
            ['project_code' => 'PRJ-123'],
            [
                'user_id' => $user->id,
                'title' => 'Sagara Living Wedding',
                'status' => 'in_progress',
                'progress_percent' => 25
            ]
        );
    }
}
