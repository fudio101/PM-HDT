<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class ComicEpisode extends Model
{
    use HasFactory, AddUser, SoftDeletes;

    protected $fillable = [
        'comic_id',
        'episode_number',
//        'published_date',
        'likes',
        'views'
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
        'user_id',
        'comic',
        'cooldown',
        'views'
    ];

    protected $appends = ['image_urls'];

    public function getImageUrlsAttribute()
    {
        $images = Storage::allFiles("comics/{$this->comic->slug}/{$this->episode_number}");
        $imageUrls = [];
        foreach ($images as $image) {
            $imageUrls[] = Storage::temporaryUrl($image, now()->addMinutes(30));
        }
        return $imageUrls;
    }

    public function getCooldownAttribute($value)
    {
        if ($value !== 0) {
            return $value;
        }
        $imageUrls = $this->image_urls;

        $godWidth = config("constants.god_width");
        $totalHeight = 0;

        foreach ($imageUrls as $imageUrl) {
            [$width, $height, $type, $attr] = getimagesize($imageUrl);
            $totalHeight += $height * ($width / $godWidth);
        }

        $result = (int) round($totalHeight * config("constants.god_number"));

        $this->setAttribute('cooldown', $result)->save();

        return $result;
    }

    public function getListOfEpisodeNumberAttribute()
    {
        return $this->comic->episodes->pluck('episode_number');
    }

    public function getViewsAttribute()
    {
        $episodeId = $this->id;

        $monthlyViews = ComicEpisodeViewByMonth::query()
            ->where('comic_episode_views_by_month.comic_episode_id', '=', $episodeId)
            ->sum('comic_episode_views_by_month.views');

        $earlyMonth = Carbon::now()->floorMonth();

        $dailyViews = ComicEpisodeViewByDay::query()
            ->where('comic_episode_views_by_day.comic_episode_id', '=', $episodeId)
            ->where('comic_episode_views_by_day.created_at', '>=', $earlyMonth)
            ->sum('comic_episode_views_by_day.views');

        $earlyDay = Carbon::now()->floorDay();

        $todayViews = ComicEpisodeViewByHour::query()
            ->where('comic_episode_views_by_hour.comic_episode_id', '=', $episodeId)
            ->where('comic_episode_views_by_hour.created_at', '>=', $earlyDay)
            ->sum('comic_episode_views_by_hour.views');
        return $monthlyViews + $dailyViews + $todayViews;
    }

    public function comic()
    {
        return $this->belongsTo(Comic::class);
    }
}
