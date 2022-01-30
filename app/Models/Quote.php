<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = [
        'total',
        'fixed_rate',
        'currency_id',
        'quotation_id',
    ];

    protected $attributes = [
        'fixed_rate' => 3
    ];
}
