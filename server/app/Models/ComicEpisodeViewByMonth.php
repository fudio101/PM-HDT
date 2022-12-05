<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class ComicEpisodeViewByMonth extends Model
{
    use HasFactory;

    protected $table = "comic_episode_views_by_month";

    /**
     * Get total comic views by month
     *
     * @param  string  $month
     * @param  string  $month1
     * @return Builder[]|Collection
     */
    public static function getTotalComicViewsByMonths(string $month, string $month1): Collection|array
    {
        $month_ = Carbon::make($month)->floorMonth()->addMonth();
        $month1_ = Carbon::make($month1)->floorMonth()->addMonth();

        $data = [];
        $now = Carbon::make(now())->floorMonth();
        for ($i = $month_->copy(); $i->lte($month1_); $i->addMonth()) {
            $i_ = $i->copy()->subMonth();

            if ($i_->eq($now)) {
                $time = $i_->copy();
                $time1 = $i_->copy()->addMonth()->subMicrosecond();

                $data[] = [
                    "date" => $i_->format('Y-m'),
                    "views" => ComicEpisodeViewByDay::query()
                        ->select(['comic_episode_views_by_day.*'])
                        ->where('created_at', '>=', $time)
                        ->where('created_at', '<=', $time1)
                        ->get()
                        ->sum('views')
                ];
            } else {
                $time = $i->copy();
                $time1 = $i->copy()->addMonth()->subMicrosecond();

                $data[] = [
                    "date" => $i_->format('Y-m'),
                    "views" => self::query()
                        ->select(['comic_episode_views_by_month.*'])
                        ->where('created_at', '>=', $time)
                        ->where('created_at', '<=', $time1)
                        ->get()
                        ->sum('views')
                ];
            }
        }

        return $data;
    }
}
