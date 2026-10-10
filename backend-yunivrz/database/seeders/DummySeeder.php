<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Project;
use App\Models\Catalog;
use App\Models\Package;
use App\Models\Invoice;
use App\Models\ProjectLog;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DummySeeder extends Seeder
{
    public function run(): void
    {
        $role = Role::where('name', 'client')->first();
        if (!$role) return;

        // 1. Create Catalogs
        $catalog1 = Catalog::firstOrCreate(
            ['slug' => 'sagara-wedding'],
            [
                'title' => 'Sagara Wedding Invitation',
                'category' => 'milestones',
                'description' => 'Undangan digital premium dengan desain elegan dan fitur RSVP interaktif.',
                'thumbnail' => '/images/catalogs/sagara.jpg',
                'images' => ['/images/catalogs/sagara-1.jpg', '/images/catalogs/sagara-2.jpg'],
                'features' => ['Custom Design', 'RSVP System', 'Background Music', 'Gallery'],
                'is_featured' => true,
                'is_active' => true,
            ]
        );

        $catalog2 = Catalog::firstOrCreate(
            ['slug' => 'nara-cafe'],
            [
                'title' => 'Nara Cafe Digital Menu',
                'category' => 'micro_moments',
                'description' => 'Katalog menu digital interaktif untuk cafe dengan QR Code.',
                'thumbnail' => '/images/catalogs/nara.jpg',
                'images' => ['/images/catalogs/nara-1.jpg'],
                'features' => ['QR Code', 'Dynamic Pricing', 'Category Filter'],
                'is_featured' => false,
                'is_active' => true,
            ]
        );

        $catalog3 = Catalog::firstOrCreate(
            ['slug' => 'neo-corp'],
            [
                'title' => 'Neo Corp Company Profile',
                'category' => 'custom_solutions',
                'description' => 'Website profil perusahaan profesional dengan sistem CMS lengkap.',
                'thumbnail' => '/images/catalogs/neo.jpg',
                'images' => ['/images/catalogs/neo-1.jpg'],
                'features' => ['Custom CMS', 'SEO Optimized', 'Fast Loading', 'Blog'],
                'is_featured' => true,
                'is_active' => true,
            ]
        );

        $catalog4 = Catalog::firstOrCreate(
            ['slug' => 'birthday-gift'],
            [
                'title' => 'Interactive Birthday Gift',
                'category' => 'milestones',
                'description' => 'Website hadiah ulang tahun interaktif dengan animasi spesial.',
                'thumbnail' => '/images/catalogs/bday.jpg',
                'images' => ['/images/catalogs/bday-1.jpg'],
                'features' => ['Interactive UI', 'Animations', 'Personalized Content'],
                'is_featured' => true,
                'is_active' => true,
            ]
        );

        // 2. Create Packages
        $pkgBasic = Package::firstOrCreate(
            ['name' => 'Essential Package'],
            [
                'catalog_id' => $catalog1->id,
                'description' => 'Paket dasar untuk kebutuhan standar.',
                'price' => 350000,
                'features' => ['Desain Template', 'Masa aktif 3 bulan', 'Maksimal 100 tamu'],
                'is_popular' => false,
                'is_active' => true,
            ]
        );

        $pkgPro = Package::firstOrCreate(
            ['name' => 'Premium Package'],
            [
                'catalog_id' => $catalog1->id,
                'description' => 'Paket lengkap dengan fitur premium.',
                'price' => 750000,
                'features' => ['Custom Desain', 'Masa aktif 1 tahun', 'Tamu tidak terbatas', 'Custom Domain'],
                'is_popular' => true,
                'is_active' => true,
            ]
        );

        // 3. Create Clients
        $client1 = User::firstOrCreate(
            ['email' => 'client@yunivrz.com'],
            [
                'name' => 'Anindya Putri',
                'password' => Hash::make('password'),
                'role_id' => $role->id,
                'phone' => '081234567890',
                'is_active' => true,
            ]
        );

        $client2 = User::firstOrCreate(
            ['email' => 'budi@example.com'],
            [
                'name' => 'Budi Santoso',
                'password' => Hash::make('password'),
                'role_id' => $role->id,
                'phone' => '081987654321',
                'is_active' => true,
            ]
        );

        // 4. Create Projects
        $project1 = Project::firstOrCreate(
            ['project_code' => 'PRJ-123'],
            [
                'user_id' => $client1->id,
                'catalog_id' => $catalog1->id,
                'package_id' => $pkgPro->id,
                'title' => 'Sagara Living Wedding',
                'brief' => 'Tema rustic dengan nuansa hijau sage dan emas.',
                'status' => 'in_progress',
                'progress_percent' => 45,
                'deadline' => Carbon::now()->addDays(30),
                'started_at' => Carbon::now()->subDays(5),
            ]
        );

        $project2 = Project::firstOrCreate(
            ['project_code' => 'PRJ-124'],
            [
                'user_id' => $client2->id,
                'catalog_id' => $catalog2->id,
                'package_id' => null,
                'title' => 'Nara Cafe E-Menu',
                'brief' => 'Menu minimalis dengan kategori yang mudah dinavigasi.',
                'status' => 'completed',
                'progress_percent' => 100,
                'deadline' => Carbon::now()->subDays(2),
                'live_url' => 'https://nara.menu',
                'started_at' => Carbon::now()->subDays(20),
                'completed_at' => Carbon::now()->subDays(2),
            ]
        );

        $project3 = Project::firstOrCreate(
            ['project_code' => 'PRJ-125'],
            [
                'user_id' => $client1->id,
                'catalog_id' => $catalog4->id,
                'package_id' => null,
                'title' => 'Interactive Birthday Gift',
                'brief' => 'Membuat website ucapan ulang tahun dengan animasi interaktif.',
                'status' => 'completed',
                'progress_percent' => 100,
                'deadline' => Carbon::now()->subDays(1),
                'live_url' => 'https://bday-gift-ollv18.netlify.app/',
                'started_at' => Carbon::now()->subDays(10),
                'completed_at' => Carbon::now()->subDays(1),
            ]
        );

        // 5. Create Invoices
        Invoice::firstOrCreate(
            ['invoice_number' => 'INV-2026-001'],
            [
                'project_id' => $project1->id,
                'type' => 'dp',
                'amount' => 1750000,
                'status' => 'paid',
                'due_date' => Carbon::now()->subDays(4),
                'paid_at' => Carbon::now()->subDays(4),
                'payment_method' => 'Bank Transfer - BCA',
            ]
        );

        Invoice::firstOrCreate(
            ['invoice_number' => 'INV-2026-002'],
            [
                'project_id' => $project1->id,
                'type' => 'full_payment',
                'amount' => 1750000,
                'status' => 'unpaid',
                'due_date' => Carbon::now()->addDays(30),
            ]
        );

        // 6. Create Project Logs
        ProjectLog::firstOrCreate(
            ['project_id' => $project1->id, 'action' => 'Proyek Dimulai'],
            [
                'description' => 'Pembayaran DP telah diterima. Tim mulai mengerjakan desain awal.',
                'created_at' => Carbon::now()->subDays(4),
            ]
        );

        ProjectLog::firstOrCreate(
            ['project_id' => $project1->id, 'action' => 'Desain Awal Selesai'],
            [
                'description' => 'Desain wireframe dan mockup awal telah diunggah untuk direview.',
                'created_at' => Carbon::now()->subDays(1),
            ]
        );
    }
}
