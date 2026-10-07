<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'catalog_id',
        'name',
        'description',
        'price',
        'features',
        'is_popular',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'features' => 'array',
        'is_popular' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:2'
    ];

    public function catalog()
    {
        return $this->belongsTo(Catalog::class);
    }
}
