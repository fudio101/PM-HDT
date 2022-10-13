<?php

namespace App\Mail;

use App\Models\User;
use DateTime;
use DateTimeZone;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class PasswordResetEmail extends Mailable
{
    use Queueable, SerializesModels;

    private MailMessage $message;

    /**
     * Create a new message instance.
     *
     * @return void
     * @throws Exception
     */
    public function __construct(User $user)
    {
        $date = new DateTime("now", new DateTimeZone('America/New_York'));
        $this->message = (new MailMessage)
            ->greeting('Hello '.$user->name)
            ->line('Your password have been change at '.$date->format('Y-m-d H:i:s').'.');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('Password changed')
            ->markdown('vendor.notifications.email', $this->message->data());
    }
}
