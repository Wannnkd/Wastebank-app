<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExternalWastePrice extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'price_source_id',
        'external_id',
        'external_code',
        'category',
        'item_name',
        'price',
        'unit',
        'image_url',
        'source_updated_at',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'source_updated_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function source(): BelongsTo
    {
        return $this->belongsTo(PriceSource::class, 'price_source_id');
    }
}
