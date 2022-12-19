<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use willvincent\Rateable\Rateable;

class Comic extends Model
{
    use HasFactory, SoftDeletes, AddUser, HasSlug, Searchable, Rateable;

    protected $table = 'comics';
    protected $fillable = [
        'name', 'user_id', 'author_id', 'description', 'published_date', 'like', 'view', 'status', 'country_id'
    ];
    protected $appends = [
//        'author_name',
//        'category_names',
        'image_url',
        'num_of_episodes',
//        'updated_time',
//        'updated_time_diff_on_days',
//      'country_name',
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
        'user_id',
        'episodes',
        'country_id',
        'author_id',
        'views',
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

    public function getCategoryNamesAttribute()
    {
        return $this->categories->pluck('name');
    }

    public function countryName(): Attribute
    {
        return Attribute::make(
            get: static fn($value, $attributes) => Country::find($attributes['country_id'])->name
        );
    }

    public function getCountryNamesAttribute()
    {
        return $this->countries->pluck('name');
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

    public function getViewsAttribute()
    {
        return $this->episodes->sum('views');
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

    function country(): HasOne
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }

    /**
     * @return HasMany|ComicEpisode
     */
    public function episodes()
    {
        return $this->hasMany(ComicEpisode::class, 'comic_id', 'id')->orderBy('episode_number');
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

    //View statistic

    /**
     * Get comics by day with view count desc
     *
     * @param  string  $day
     * @param  int  $limit
     * @return array|Collection|null
     */
    public static function getComicViewStatisticsByDay(string $day, int $limit = -1): array|Collection|null
    {
        $time = Carbon::make($day)->floorDay();
        $now = Carbon::make(now())->floorDay();

        if ($time->gt($now)) {
            if ($limit <= 0) {
                return self::all();
            }
            return self::all()->slice(0, $limit);
        }

        if ($now->gt($time)) {
            $startTime = Carbon::make($day)->floorDay()->addDay();
            $endTime = Carbon::make($day)->floorDay()->addDays(2)->subMicrosecond();

            $comics = self::query()
                ->select(['comics.*'])
                ->leftJoin('comic_episodes', 'comic_episodes.comic_id', '=', 'comics.id')
                ->whereNull('comic_episodes.deleted_at')
                ->leftJoin('comic_episode_views_by_day', function ($join) use ($startTime, $endTime) {
                    $join->on('comic_episode_views_by_day.comic_episode_id', '=', 'comic_episodes.id')
                        ->where('comic_episode_views_by_day.created_at', '>=', $startTime)
                        ->where('comic_episode_views_by_day.created_at', '<=', $endTime);
                })
                ->groupBy(['comic_episodes.comic_id', 'comics.id'])
                ->orderByDesc(DB::raw('sum(comic_episode_views_by_day.views)'))
                ->limit($limit)->get();

            return $comics;
        }

        $startTime = Carbon::make($day)->floorDay()->addHour();
        $endTime = Carbon::make($day)->floorDay()->addHour()->addDay()->subMicrosecond();

        $comics = self::query()
            ->select(['comics.*'])
            ->leftJoin('comic_episodes', 'comic_episodes.comic_id', '=', 'comics.id')
            ->whereNull('comic_episodes.deleted_at')
            ->leftJoin('comic_episode_views_by_hour', function ($join) use ($startTime, $endTime) {
                $join->on('comic_episode_views_by_hour.comic_episode_id', '=', 'comic_episodes.id')
                    ->where('comic_episode_views_by_hour.created_at', '>=', $startTime)
                    ->where('comic_episode_views_by_hour.created_at', '<=', $endTime);
            })
            ->groupBy(['comic_episodes.comic_id', 'comics.id'])
            ->orderByDesc(DB::raw('sum(comic_episode_views_by_hour.views)'))
            ->limit($limit)->get();

        return $comics;
    }

    /**
     * Get comics by month with view count desc
     *
     * @param  string  $month
     * @param  int  $limit
     * @return array|Collection|null
     */
    public static function getComicViewStatisticsByMonth(string $month, int $limit = -1): array|Collection|null
    {
        $time = Carbon::make($month)->floorMonth();
        $now = Carbon::make(now())->floorMonth();

        if ($time->gt($now)) {
            if ($limit <= 0) {
                return self::all();
            }
            return self::all()->slice(0, $limit);
        }

        if ($now->gt($time)) {
            $startTime = Carbon::make($month)->floorMonth()->addMonth();
            $endTime = Carbon::make($month)->floorMonth()->addMonth(2)->subMicrosecond();

            $comics = self::query()
                ->select(['comics.*'])
                ->leftJoin('comic_episodes', 'comic_episodes.comic_id', '=', 'comics.id')
                ->whereNull('comic_episodes.deleted_at')
                ->leftJoin('comic_episode_views_by_month', function ($join) use ($startTime, $endTime) {
                    $join->on('comic_episode_views_by_month.comic_episode_id', '=', 'comic_episodes.id')
                        ->where('comic_episode_views_by_month.created_at', '>=', $startTime)
                        ->where('comic_episode_views_by_month.created_at', '<=', $endTime);
                })
                ->groupBy(['comic_episodes.comic_id', 'comics.id'])
                ->orderByDesc(DB::raw('sum(comic_episode_views_by_month.views)'))
                ->limit($limit)->get();

            return $comics;
        }

        $startTime = Carbon::make($month)->floorMonth()->addDay();
        $endTime = Carbon::make($month)->floorMonth()->addDay()->addMonth()->subMicrosecond();

        $comics = self::query()
            ->select(['comics.*'])
            ->leftJoin('comic_episodes', 'comic_episodes.comic_id', '=', 'comics.id')
            ->whereNull('comic_episodes.deleted_at')
            ->leftJoin('comic_episode_views_by_day', function ($join) use ($startTime, $endTime) {
                $join->on('comic_episode_views_by_day.comic_episode_id', '=', 'comic_episodes.id')
                    ->where('comic_episode_views_by_day.created_at', '>=', $startTime)
                    ->where('comic_episode_views_by_day.created_at', '<=', $endTime);
            })
            ->groupBy(['comic_episodes.comic_id', 'comics.id'])
            ->orderByDesc(DB::raw('sum(comic_episode_views_by_day.views)'))
            ->limit($limit)->get();

        return $comics;
    }

    /**
     * @param  int  $limit
     * @return Collection
     */
    public static function getComicViewStatistics(int $limit = -1): Collection
    {
        if ($limit <= 0) {
            return self::all()->sortByDesc('views');
        }

        return self::all()->sortByDesc('views')->slice(0, $limit);
    }
}
