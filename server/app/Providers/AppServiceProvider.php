<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\App;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
//        ResetPassword::createUrlUsing(function ($user, string $token) {
//            return 'https://example.com/reset-password?token='.$token.'/'.$user->email;
//        });
//        App::setLocale('vi');
    }
}
