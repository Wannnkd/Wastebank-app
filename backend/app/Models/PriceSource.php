<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PriceSource extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'url',
        'area',
        'notes',
        'last_checked_at',
        'is_active',
    ];

    protected $casts = [
        'last_checked_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function prices(): HasMany
    {
        return $this->hasMany(ExternalWastePrice::class);
    }
}
