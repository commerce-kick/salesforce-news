<?php

namespace App\Filament\Resources\OpenPositions\Schemas;

use App\Filament\Resources\OpenPositions\OpenPositionResource;
use App\Models\OpenPosition;
use App\Notifications\PositionEmailVerification;
use Filament\Actions\Action;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Notification as FacadesNotification;

class OpenPositionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Job Details')
                ->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255)
                        ->columnSpanFull(),

                    TextInput::make('location')->required()->maxLength(255),

                    Select::make('job_type')
                        ->required()
                        ->options([
                            'full-time' => 'Full Time',
                            'part-time' => 'Part Time',
                            'contract' => 'Contract',
                            'freelance' => 'Freelance',
                            'internship' => 'Internship',
                        ]),

                    TextInput::make('salary')
                        ->required()
                        ->numeric()
                        ->prefix('$')
                        ->helperText('Salary is required to publish the job')
                        ->rules(['required', 'numeric', 'min:0']),

                    SpatieTagsInput::make('tags'),
                ])
                ->columns(2),
            Section::make()->schema([
                TextInput::make('company_email')
                    ->email()
                    ->required()
                    ->helperText(
                        'Use your company email (e.g., hr@hyppe.cc). The company name will be extracted from the domain.',
                    )
                    ->live(debounce: 300)
                    ->afterStateUpdated(function ($state, callable $set) {
                        if ($state) {
                            $companyName = OpenPosition::extractCompanyFromEmail($state);
                            $set('company_name', $companyName ? ucfirst($companyName) : '');
                        }
                    })
                    ->disabled(fn($record) => $record?->isEmailVerified()),

                TextInput::make('company_name')->required()->helperText('Automatically extracted from email domain'),

                Action::make('send_otp')
                    ->label('Send Verification Code')
                    ->icon('heroicon-o-envelope')
                    ->visible(fn($record) => $record && !$record->isEmailVerified())
                    ->requiresConfirmation()
                    ->modalHeading('Send Verification Code')
                    ->modalDescription(fn($record) => (
                        'A 6-digit verification code will be sent to ' . $record->company_email
                    ))
                    ->action(function ($record) {
                        $otp = $record->generateOTP();

                        // Send email notification
                        FacadesNotification::route(
                            'mail',
                            $record->company_email,
                        )->notify(new PositionEmailVerification($record, $otp));

                        Notification::make()
                            ->success()
                            ->title('Verification code sent!')
                            ->body('Check ' . $record->company_email . ' for your 6-digit code.')
                            ->send();
                    })
                    ->visible(fn($record) => $record !== null),

                Action::make('verify_otp')
                    ->label('Verify Code')
                    ->icon('heroicon-o-check-badge')
                    ->visible(fn($record) => $record && !$record->isEmailVerified())
                    ->schema([
                        TextInput::make('otp_code')
                            ->label('6-Digit Verification Code')
                            ->required()
                            ->length(6)
                            ->numeric()
                            ->placeholder('000000'),
                    ])
                    ->action(function (array $data, $record) {
                        if ($record->verifyOTP($data['otp_code'])) {
                            Notification::make()
                                ->success()
                                ->title('Email verified!')
                                ->body('Your company email has been verified successfully.')
                                ->send();

                            return redirect()->to(OpenPositionResource::getUrl('edit', ['record' => $record]));
                        } else {
                            Notification::make()
                                ->danger()
                                ->title('Invalid or expired code')
                                ->body('Please request a new verification code.')
                                ->send();
                        }
                    })
                    ->visible(fn($record) => $record !== null),
            ]),

            RichEditor::make('content')->required()->columnSpanFull(),

            Section::make('Publication Status')
                ->schema([
                    Select::make('status')
                        ->options([
                            'draft' => 'Draft',
                            'published' => 'Published',
                        ])
                        ->default('draft')
                        ->disabled(fn($record) => $record && !$record->canPublish())
                        ->helperText(fn($record) => $record && !$record->canPublish()
                            ? 'Complete salary and email verification to publish'
                            : 'Set to Published when ready'),
                ])
                ->visible(fn($record) => $record !== null)
                ->columnSpanFull(),
        ]);
    }
}
