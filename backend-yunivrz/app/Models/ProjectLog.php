<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectLog extends Model
{
    public $timestamps = false; // We only have created_at in DB
    
    protected $fillable = [
        'project_id',
        'user_id',
        'action',
        'description',
        'metadata',
        'created_at'
    ];

    protected $casts = [
        'metadata' => 'array',
        'created_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
