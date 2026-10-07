<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'user_id',
        'catalog_id',
        'package_id',
        'project_code',
        'title',
        'brief',
        'status',
        'progress_percent',
        'deadline',
        'live_url',
        'admin_notes',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'deadline' => 'date',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
