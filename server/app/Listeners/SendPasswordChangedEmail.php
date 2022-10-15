<?php

namespace App\Listeners;

use App\Events\PasswordChanged;
use App\Mail\PasswordChangedEmail;
use App\Mail\PasswordResetEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendPasswordChangedEmail implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  PasswordChanged  $event
     * @return void
     */
    public function handle(PasswordChanged $event)
    {
        $user = $event->user;
        Mail::to($user)
            ->send(new PasswordChangedEmail($user));
    }
}
