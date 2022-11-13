<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Comics extends Model
{
    use HasFactory, SoftDeletes, AddUser, HasSlug, Searchable;

    protected $table = 'comics';
    protected $fillable = ['name', 'user_id', 'author_id', 'description', 'published_date', 'like', 'view', 'status'];
    protected $appends = ['author_name', 'user_name', 'category_names'];

    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
        'user_id',
    ];


    public function searchableAs()
    {
        return 'comics_index';
    }

    public function toSearchableArray()
    {
        return [
            'name' => $this->name,
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
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

    public function categoryNames(): Attribute
    {
        return Attribute::make(
            get: static function ($value, $attributes) {
                $categoryNames = [];
                $categories = ComicsCategory::getByComic($attributes['id']);
                foreach ($categories as $category) {
                    $categoryNames[] = Category::find($category->category_id)->name;
                }
                return $categoryNames;
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

    /**
     * @param  $episode_number
     * @return Model|HasMany|object|null
     */
    public function getEpisode($episode_number)
    {
        return $this->hasMany(ComicEpisode::class, 'comic_id', 'id')->where('episode_number', "=",
            $episode_number)->first();
    }

    /**
     * @return HasMany|ComicEpisode
     */
    public function episodes()
    {
        return $this->hasMany(ComicEpisode::class, 'comic_id', 'id');
    }
}
