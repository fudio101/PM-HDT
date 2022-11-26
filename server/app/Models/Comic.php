<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Comic extends Model
{
    use HasFactory, SoftDeletes, AddUser, HasSlug, Searchable;

    protected $table = 'comics';
    protected $fillable = ['name', 'user_id', 'author_id', 'description', 'published_date', 'like', 'view', 'status'];
    protected $appends = [
//        'author_name',
        'user_name',
//        'category_names',
        'image_url',
        'num_of_episodes',
//        'updated_time',
//        'updated_time_diff_on_days',
        'country_name',
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
        'user_id',
        'episodes',
    ];

    protected $with = [
//        'author',
//        'categories',
//        'episodes',
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

    public function image(): Attribute
    {
        return Attribute::make(
            get: static fn(
                $value,
                $attributes
            ) => empty($image = preg_grep("/^comics\/{$attributes['slug']}\./", Storage::files('comics/'))) ?
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
            ) => empty($image = preg_grep("/^comics\/{$attributes['slug']}\./", Storage::files('comics/'))) ?
                null :
                Storage::temporaryUrl(array_shift($image), now()->addMinutes(30))

        );
    }

    public function getAuthorNameAttribute()
    {
        return $this->author->name;
    }

    public function userName(): Attribute
    {
        return Attribute::make(
            get: static fn($value, $attributes) => User::find($attributes['user_id'])->name
        );
    }
    public function counrtyName(): Attribute
    {
        return Attribute::make(
            get: static fn($value, $attributes) => Country::find($attributes['country_id'])->name
        );
    }
    public function getCategoryNamesAttribute()
    {
        return $this->categories->pluck('name');
    }

    public function getNumOfEpisodesAttribute()
    {
        return $this->episodes->count();
    }

    public function getUpdatedTimeDiffAttribute()
    {
        if ($this->updated_time_diff_on_days > 7) {
            return null;
        }

        if ($this->updated_time_diff_on_days > 0) {
            return $this->updated_time_diff_on_days.' ngày';
        }

        $t = Carbon::createFromTimestamp($this->updated_time)->diffInHours(now());
        if ($t > 0) {
            return $t.' Giờ Trước';
        }

        $t = Carbon::createFromTimestamp($this->updated_time)->diffInMinutes(now());
        if ($t > 0) {
            return $t.' Phút Trước';
        }

        return 'Vừa Xong';
    }

    public function getUpdatedTimeDiffOnDaysAttribute()
    {
        return Carbon::createFromTimestamp($this->updated_time)->diffInDays(now());
    }

    public function getUpdatedTimeAttribute()
    {
        $data = $this->episodes->sortByDesc('created_at')->first();
        if ($data) {
            return Carbon::make($data->created_at)->getTimestamp();
        }

        return Carbon::make($this->created_at)->getTimestamp();
    }

    static function getActive($id)
    {
        return Comic::where('status', 0)->get();
    }

    static function getStop($id)
    {
        return Comic::where('status', 1)->get();
    }

    /**
     * @return HasOne
     */
    function author(): HasOne
    {
        return $this->hasOne(Author::class, 'id', 'author_id');
    }

    /**
     * @return HasMany|ComicEpisode
     */
    public function episodes()
    {
        return $this->hasMany(ComicEpisode::class, 'comic_id', 'id');
    }

    function categories()
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
}
