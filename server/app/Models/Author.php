<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class Author extends Model
{
    use HasFactory, SoftDeletes, AddUser;

    protected $table = "authors";

    protected $fillable = [
        'name',
        'image'
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

    function comics()
    {
        return $this->hasMany(Comic::class, 'author_id', 'id');
    }
}
