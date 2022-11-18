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

    public function image(): Attribute
    {
        return Attribute::make(
            get: static fn(
                $value,
                $attributes
            ) => empty($image = preg_grep("/^authors\/{$attributes['id']}\./", Storage::files('authors/'))) ?
                null :
                array_shift($image)

        );
    }

    public function imageUrl(): Attribute
    {
        return Attribute::make(
            get: static fn(
                $value,
                $attributes
            ) => empty($image = preg_grep("/^authors\/{$attributes['id']}\./", Storage::files('authors/'))) ?
                null :
                Storage::temporaryUrl(array_shift($image), now()->addMinutes(30))

        );
    }

    function comics()
    {
        return $this->hasMany(Comic::class, 'author_id', 'id');
    }
}
