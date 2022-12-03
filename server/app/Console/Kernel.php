<?php

namespace App\Console;

use App\Models\ComicEpisodeView;
use App\Models\ComicEpisodeViewByDay;
use App\Models\ComicEpisodeViewByHour;
use App\Models\ComicEpisodeViewByMonth;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->command('auth:clear-resets')->everyFourHours();

        // Import view count to hourly table
        $schedule->call(function () {
            $startTime = Carbon::make(now())->subHour()->microsecond(0)->second(0)->minute(0);
            $endTime = Carbon::make(now())->microsecond(0)->second(0)->minute(0)->subMicroseconds();

            $hourViews = ComicEpisodeView::query()
                ->where('created_at', '>=', $startTime)
                ->where('created_at', '<=', $endTime)
                ->where('accepted', '=', 1)
                ->groupBy('comic_episode_id', 'ip')
                ->select('comic_episode_id', DB::raw('count(*) as total'))
                ->get();

            foreach ($hourViews as $hourView) {
                $comicEpisodeViewByHour = new ComicEpisodeViewByHour();
                $comicEpisodeViewByHour->comic_episode_id = $hourView->comic_episode_id;
                $comicEpisodeViewByHour->views = $hourView->total;
                $comicEpisodeViewByHour->save();
            }
        })->name("import-hourly-views")->hourly();

        // Import view count to daily table
        $schedule->call(function () {
            $startTime = Carbon::make(now())->subDay()->microsecond(0)->second(0)->minute(0)->hour(0);
            $endTime = Carbon::make(now())->microsecond(0)->second(0)->minute(0)->hour(0)->subMicroseconds();

            $dayViews_ = ComicEpisodeViewByHour::query()
                ->where('created_at', '>=', $startTime)
                ->where('created_at', '<=', $endTime)
                ->groupBy('comic_episode_id')
                ->select('comic_episode_id', DB::raw('sum(views) as total'));

            $dayViews = $dayViews_->get();

            foreach ($dayViews as $dayView) {
                $comicEpisodeViewByDay = new ComicEpisodeViewByDay();
                $comicEpisodeViewByDay->comic_episode_id = $dayView->comic_episode_id;
                $comicEpisodeViewByDay->views = $dayView->total;
                $comicEpisodeViewByDay->save();
            }

            $dayViews_->delete();
        })->name("import-daily-views")->daily();

        // Import view count to monthly table
        $schedule->call(function () {
            $startTime = Carbon::make(now())->subMonth()->microsecond(0)->second(0)->minute(0)->hour(0)->day(1);
            $endTime = Carbon::make(now())->microsecond(0)->second(0)->minute(0)->hour(0)->day(1)->subMicroseconds();

            $monthViews_ = ComicEpisodeViewByDay::query()
                ->where('created_at', '>=', $startTime)
                ->where('created_at', '<=', $endTime)
                ->groupBy('comic_episode_id')
                ->select('comic_episode_id', DB::raw('sum(views) as total'));

            $monthViews = $monthViews_->get();

            foreach ($monthViews as $monthView) {
                $comicEpisodeViewByMonth = new ComicEpisodeViewByMonth();
                $comicEpisodeViewByMonth->comic_episode_id = $monthView->comic_episode_id;
                $comicEpisodeViewByMonth->views = $monthView->total;
                $comicEpisodeViewByMonth->save();
            }

            $monthViews_->delete();
        })->name("import-monthly-views")->monthly();

        // Delete unaccepted records 2 time per day
        $schedule->call(function () {
            $startTime = Carbon::make(now())->subHours(7)->microsecond(0)->second(0)->minute(0);
            $endTime = Carbon::make(now())->microsecond(0)->second(0)->minute(0)->subHour();

            ComicEpisodeView::query()
                ->where('created_at', '>=', $startTime)
                ->where('created_at', '<=', $endTime)
                ->where('accepted', '=', 0)
                ->delete();
        })->name("delete-unaccepted-views")->twiceDaily(0, 12);

        // Delete view records weekly
        $schedule->call(function () {
            $startTime = Carbon::make(now())->subWeek()->microsecond(0)->second(0)->minute(0)->hour(0)->subHour();
            $endTime = Carbon::make(now())->microsecond(0)->second(0)->minute(0)->hour(0)->subHour();
            
            ComicEpisodeView::query()
                ->where('created_at', '>=', $startTime)
                ->where('created_at', '<=', $endTime)
                ->delete();
        })->name("delete-old-views")->weekly();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
