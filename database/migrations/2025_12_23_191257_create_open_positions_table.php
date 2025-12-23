<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('open_positions', function (Blueprint $table) {
            $table->id();
            $table->ulid('ulid')->unique();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->jsonb('content')->nullable();
            $table->string('location')->nullable();
            $table->string('job_type'); // full-time, part-time, contract, etc.
            $table->decimal('salary', 10, 2)->nullable();
            $table->string('company_name');
            $table->string('company_email');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('otp_code', 6)->nullable();
            $table->timestamp('otp_expires_at')->nullable();
            $table->string('status')->default('draft');
            $table->timestamps();

            // Single column indexes for filtering
            $table->index('status'); // Filter by status (draft, published, etc.)
            $table->index('job_type'); // Filter by job type
            $table->index('company_email'); // Email verification lookups
            $table->index('email_verified_at'); // Filter verified/unverified jobs
            $table->index('created_at'); // Sort by creation date
            $table->index('salary'); // Filter/sort by salary range

            // Composite indexes for common query patterns
            $table->index(['status', 'created_at']); // Published jobs ordered by date (most common query)
            $table->index(['user_id', 'status']); // User's jobs filtered by status
            $table->index(['status', 'email_verified_at']); // Verified published jobs
            $table->index(['job_type', 'status']); // Jobs by type that are published
            $table->index(['company_name', 'status']); // Company's published jobs

            // OTP management
            $table->index(['otp_code', 'otp_expires_at']); // OTP verification queries
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('open_positions');
    }
};
