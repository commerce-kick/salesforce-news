<?php

namespace App\Models;

use Filament\Forms\Components\RichEditor\FileAttachmentProviders\SpatieMediaLibraryFileAttachmentProvider;
use Filament\Forms\Components\RichEditor\Models\Concerns\InteractsWithRichContent;
use Filament\Forms\Components\RichEditor\Models\Contracts\HasRichContent;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Tags\HasTags;
use WillVincent\LaravelUnique\HasUniqueNames;

class Post extends Model implements HasRichContent, HasMedia
{
    use HasTags, InteractsWithRichContent, InteractsWithMedia, HasUniqueNames;

    protected $uniqueField = 'slug';
    protected $constraintFields = ['user_id'];
    protected $uniqueSuffixFormat = '-{n}';

    protected $fillable = [
        'user_id',
        'slug',
        'title',
        'content',
        'category',
        'is_published',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'content' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function setUpRichContent(): void
    {
        $this->registerRichContent('content')->fileAttachmentProvider(SpatieMediaLibraryFileAttachmentProvider::make());
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
