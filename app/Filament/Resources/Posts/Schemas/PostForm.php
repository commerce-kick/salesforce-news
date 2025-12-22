<?php

namespace App\Filament\Resources\Posts\Schemas;

use App\Enums\CategoryTypes;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            // Title field - generates slug
            TextInput::make('title')
                ->required()
                ->maxLength(255)
                ->live(onBlur: true)
                ->afterStateUpdated(fn($set, ?string $state) => $set('slug', Str::slug($state))),

            // Slug field - slugifies user input too
            TextInput::make('slug')
                ->required()
                ->maxLength(255)
                ->helperText('Auto-generated from title, but you can customize it.')
                ->live(debounce: 300) // Slugify as user types (with delay)
                ->afterStateUpdated(fn($set, ?string $state) => $set('slug', Str::slug($state))),

            Toggle::make('is_published')->label('Published')->default(false),

            RichEditor::make('content')
                ->required()
                ->columnSpanFull()
                ->json(),

            Select::make('category')->options(CategoryTypes::class),

            SpatieTagsInput::make('tags'),
        ]);
    }
}
