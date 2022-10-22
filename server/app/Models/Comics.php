<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Comics extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'comics';
    protected $fillable = ['name', 'user_id', 'author_id', 'description', 'published_date', 'like', 'view', 'status'];
    protected $appends = ['author_name', 'user_name', 'category_name'];

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($comics) {
            $comics->user_id = Auth::user()->id;
        });
        static::updating(function ($comics) {
            $comics->user_id = Auth::user()->id;
        });
    }


    public function authorName(): Attribute
    {
        return Attribute::make(
            get: static fn($value, $attributes) => Author::find($attributes['author_id'])->name

        );
    }

    public function userName(): Attribute
    {
        return Attribute::make(
            get: static fn($value, $attributes) => User::find($attributes['user_id'])->name
        );
    }

    public function categoryName(): Attribute
    {
        return Attribute::make(
            get: static function ($value, $attributes) {
                $listCategoryname = [];
                $list = ComicsCategory::getAllComics($attributes['id']);
                foreach ($list as $value) {
                    $listCategoryname[] = Category::find($value->category_id)->name;
                }
                return $listCategoryname;
            }
        );
    }

    static function getActive($id)
    {
        return Comics::where('status', 1)->get();
    }

    static function getStop($id)
    {
        return Comics::where('status', 0)->get();
    }

    function author()
    {
        return $this->hasOne(Author::class, 'id', 'author_id');
    }

    function category()
    {
        return $this->belongsToMany(Category::class, 'comic_category', 'comic_id', 'category_id');
    }

}
