<?php

namespace App\Console;

use App\Models\ComicEpisodeView;
use App\Models\ComicEpisodeViewByHour;
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
        
        $schedule->call(function () {
            $startTime = Carbon::make(now())->subHours()->microsecond(0)->second(0)->minute(0);
            $endTime = Carbon::make(now())->microsecond(0)->second(0)->minute(0)->subMicroseconds();
            $hourViews = ComicEpisodeView::query()
                ->where('created_at', '>=', $startTime)
                ->where('created_at', '<=', $endTime)
                ->groupBy('comic_episode_id', 'ip')
                ->select('comic_episode_id', DB::raw('count(*) as total'))
                ->get();
            foreach ($hourViews as $hourView) {
                $comicEpisodeViewByHour = new ComicEpisodeViewByHour();
                $comicEpisodeViewByHour->comic_episode_id = $hourView->comic_episode_id;
                $comicEpisodeViewByHour->views = $hourView->total;
                $comicEpisodeViewByHour->save();
            }
        })->hourlyAt(0);
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
