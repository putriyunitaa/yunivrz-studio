<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRoleId = DB::table('roles')->where('name', 'admin')->value('id');

        DB::table('users')->insert([
            'role_id' => $adminRoleId,
            'name' => 'Admin Yunivrz',
            'email' => 'admin@yunivrz.com',
            'phone' => '081234567890',
            'password' => Hash::make('password123'),
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
