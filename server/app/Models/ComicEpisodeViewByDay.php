<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class ComicEpisodeViewByDay extends Model
{
    use HasFactory;

    protected $table = "comic_episode_views_by_day";

    /**
     * Get total comic views by day
     *
     * @param  string  $day
     * @param  string  $day1
     * @return Builder[]|Collection
     */
    public static function getTotalComicViewsByDays(string $day, string $day1): Collection|array
    {
        $day_ = Carbon::make($day)->floorDay()->addDay();
        $day1_ = Carbon::make($day1)->floorDay()->addDay();

        $data = [];
        $now = Carbon::make(now())->floorDay();
        for ($i = $day_->copy(); $i->lte($day1_); $i->addDay()) {
            $i_ = $i->copy()->subDay();

            if ($i_->eq($now)) {
                $time = $i_->copy()->addHour();
                $time1 = $time->copy()->addDay()->subMicrosecond();

                $data[] = [
                    "date" => $i_->format('Y-m-d'),
                    "views" => ComicEpisodeViewByHour::query()
                        ->select(['comic_episode_views_by_hour.*'])
                        ->where('created_at', '>=', $time)
                        ->where('created_at', '<=', $time1)
                        ->get()
                        ->sum('views')
                ];
            } elseif ($i_->gt($now)) {
                $data[] = [
                    "date" => $i_->format('Y-m-d'),
                    "views" => 0
                ];
            } else {
                $time = $i->copy();
                $time1 = $i->copy()->addDay()->subMicrosecond();

                $data[] = [
                    "date" => $i_->format('Y-m-d'),
                    "views" => self::query()
                        ->select(['comic_episode_views_by_day.*'])
                        ->where('created_at', '>=', $time)
                        ->where('created_at', '<=', $time1)
                        ->get()
                        ->sum('views')
                ];
            }
        }

        return $data;
    }

    /**
     * Get total comic views at today
     *
     * @return mixed
     */
    public static function getTotalTodayComicViews(): mixed
    {
        $time = Carbon::now()->floorDay()->addHour();
        $time1 = $time->copy()->addDay()->subMicrosecond();

        return ComicEpisodeViewByHour::query()
            ->select(['comic_episode_views_by_hour.*'])
            ->where('created_at', '>=', $time)
            ->where('created_at', '<=', $time1)
            ->get()
            ->sum('views');
    }
}
