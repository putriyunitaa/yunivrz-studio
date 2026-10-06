<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('catalog_id')->nullable()->constrained('catalogs')->onDelete('set null');
            $table->foreignId('package_id')->nullable()->constrained('packages')->onDelete('set null');
            $table->string('project_code', 20)->unique();
            $table->string('title');
            $table->text('brief')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'revision', 'review', 'completed', 'cancelled'])->default('pending');
            $table->unsignedTinyInteger('progress_percent')->default(0);
            $table->date('deadline')->nullable();
            $table->string('live_url')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
