<?php

namespace App\Listeners;

use App\Mail\PasswordResetEmail;
use Exception;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendPasswordResetEmail implements ShouldQueue
{
    /**
     * The name of the connection the job should be sent to.
     *
     * @var string|null
     */
    public ?string $connection = 'database';

    /**
     * The name of the queue the job should be sent to.
     *
     * @var string|null
     */
    public ?string $queue = 'default';

    /**
     * The time (seconds) before the job should be processed.
     *
     * @var int
     */
    public int $delay = 3;


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
