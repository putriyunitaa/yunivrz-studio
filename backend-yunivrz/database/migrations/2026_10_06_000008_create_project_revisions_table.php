<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_revisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->unsignedInteger('revision_number');
            $table->text('content');
            $table->json('attachments')->nullable();
            $table->string('preview_url')->nullable();
            $table->timestamps();

            $table->unique(['project_id', 'revision_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_revisions');
    }
};
