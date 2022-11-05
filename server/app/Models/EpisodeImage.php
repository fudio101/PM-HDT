<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class EpisodeImage extends Model
{
    use HasFactory, AddUser;

    protected $fillable = [
        'comic_episode_id',
        'image',
    ];

    protected $appends = [
        'image_url'
    ];

    protected $hidden = [
        'image',
        'deleted_at',
        'created_at',
        'updated_at',
        'user_id',
    ];

    public function imageUrl(): Attribute
    {
        return Attribute::make(
            get: static fn(
                $value,
                $attributes
            ) => empty($attributes['image']) ? null : Storage::temporaryUrl($attributes['image'], now()->addMinutes(30))

        );
    }
}
