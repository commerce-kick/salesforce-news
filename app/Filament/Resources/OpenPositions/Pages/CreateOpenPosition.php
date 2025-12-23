<?php

namespace App\Filament\Resources\OpenPositions\Pages;

use App\Filament\Resources\OpenPositions\OpenPositionResource;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;

class CreateOpenPosition extends CreateRecord
{
    protected static string $resource = OpenPositionResource::class;


    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = auth()->id();
        $data['status'] = 'draft';

        return $data;
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('edit', ['record' => $this->record]);
    }

    protected function getCreatedNotification(): ?Notification
    {
        return Notification::make()
            ->success()
            ->title('Job created')
            ->body('Now verify your company email to publish this job.');
    }
}
