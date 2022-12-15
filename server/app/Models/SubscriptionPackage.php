<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class SubscriptionPackage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'price',
        'duration',
        'description'
    ];

    protected $appends = ['image_url'];

    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
        'image',
    ];

    public function getImageAttribute()
    {
        return empty($image = preg_grep("/^subscriptionPackages\/{$this->id}\./",
            Storage::files('subscriptionPackages/'))) ?
            null :
            array_shift($image);
    }

    public function getImageUrlAttribute()
    {
        return Storage::temporaryUrl($this->image, now()->addMinutes(30));
    }
}
