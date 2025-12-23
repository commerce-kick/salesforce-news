<?php

namespace App\Filament\Resources\OpenPositions;

use App\Filament\Resources\OpenPositions\Pages\CreateOpenPosition;
use App\Filament\Resources\OpenPositions\Pages\EditOpenPosition;
use App\Filament\Resources\OpenPositions\Pages\ListOpenPositions;
use App\Filament\Resources\OpenPositions\Schemas\OpenPositionForm;
use App\Filament\Resources\OpenPositions\Tables\OpenPositionsTable;
use App\Models\OpenPosition;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class OpenPositionResource extends Resource
{
    protected static ?string $model = OpenPosition::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return OpenPositionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OpenPositionsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOpenPositions::route('/'),
            'create' => CreateOpenPosition::route('/create'),
            'edit' => EditOpenPosition::route('/{record}/edit'),
        ];
    }
}
