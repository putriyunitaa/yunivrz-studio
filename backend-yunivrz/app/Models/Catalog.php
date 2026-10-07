<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'description',
        'thumbnail',
        'images',
        'features',
        'preview_url',
        'is_featured',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'images' => 'array',
        'features' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function packages()
    {
        return $this->hasMany(Package::class);
    }
}
