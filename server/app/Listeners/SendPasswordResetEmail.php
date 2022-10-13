<?php

namespace App\Listeners;

use App\Mail\PasswordResetEmail;
use Exception;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Mail;

class SendPasswordResetEmail
{
    /**
     * Handle the event.
     *
     * @param  PasswordReset  $event
     * @return void
     * @throws Exception
     */
    public function handle(PasswordReset $event)
    {
        $user = $event->user;
        Mail::to($user)
            ->send(new PasswordResetEmail($user));
    }
}
