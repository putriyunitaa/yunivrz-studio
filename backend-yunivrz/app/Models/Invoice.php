<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'project_id',
        'invoice_number',
        'type',
        'amount',
        'status',
        'due_date',
        'paid_at',
        'payment_method',
        'payment_proof',
        'notes'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'paid_at' => 'date',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
