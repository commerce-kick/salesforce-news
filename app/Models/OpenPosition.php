<?php

namespace App\Models;

use Filament\Forms\Components\RichEditor\FileAttachmentProviders\SpatieMediaLibraryFileAttachmentProvider;
use Filament\Forms\Components\RichEditor\Models\Concerns\InteractsWithRichContent;
use Filament\Forms\Components\RichEditor\Models\Contracts\HasRichContent;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Tags\HasTags;

class OpenPosition extends Model implements HasRichContent, HasMedia
{
    use InteractsWithRichContent, InteractsWithMedia, HasTags, HasUlids;

    // Keep your auto-increment primary key
    protected $primaryKey = 'id';
    public $incrementing = true;

    // Specify which columns should use ULIDs
    public function uniqueIds(): array
    {
        return ['ulid']; // Your custom ULID column name
    }

    protected $fillable = [
        'ulid',
        'user_id',
        'title',
        'content',
        'location',
        'job_type',
        'salary',
        'company_name',
        'company_email',
        'email_verified_at',
        'otp_code',
        'otp_expires_at',
        'status',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'otp_expires_at' => 'datetime',
        'content' => 'array',
    ];

    const STATUS_DRAFT = 'draft';
    const STATUS_PENDING_VERIFICATION = 'pending_verification';
    const STATUS_PUBLISHED = 'published';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isEmailVerified(): bool
    {
        return !is_null($this->email_verified_at);
    }

    public function canPublish(): bool
    {
        return $this->salary && $this->isEmailVerified();
    }

    public function generateOTP(): string
    {
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $this->update([
            'otp_code' => $otp,
            'otp_expires_at' => now()->addMinutes(10),
        ]);

        return $otp;
    }

    public function verifyOTP(string $code): bool
    {
        if ($this->otp_code === $code && $this->otp_expires_at > now()) {
            $this->update([
                'email_verified_at' => now(),
                'otp_code' => null,
                'otp_expires_at' => null,
            ]);
            return true;
        }

        return false;
    }

    public static function extractCompanyFromEmail(string $email): ?string
    {
        // Extract domain from email (e.g., hr@hyppe.cc -> hyppe)
        preg_match('/@([^.]+)\./', $email, $matches);
        return $matches[1] ?? null;
    }

    public function setUpRichContent(): void
    {
        $this->registerRichContent('content')->fileAttachmentProvider(SpatieMediaLibraryFileAttachmentProvider::make());
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
