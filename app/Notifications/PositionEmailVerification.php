<?php

namespace App\Notifications;

use App\Models\OpenPosition;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PositionEmailVerification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public OpenPosition $job,
        public string $otpCode,
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage())
            ->subject('Verify Your Email to Post Job: ' . $this->job->title)
            ->greeting('Hello!')
            ->line('You are receiving this email to verify your company email for posting a job on our platform.')
            ->line('**Job Title:** ' . $this->job->title)
            ->line('**Company:** ' . $this->job->company_name)
            ->line('**Your verification code is:**')
            ->line('# ' . $this->otpCode)
            ->line('This code will expire in 10 minutes.')
            ->line('Please enter this code in the verification form to publish your job.')
            ->line('If you did not attempt to post this job, please ignore this email.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
