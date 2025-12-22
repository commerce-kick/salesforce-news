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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('title');
            $table->jsonb('content')->nullable();
            $table->string('category')->default('post');
            $table->timestamps();

            // Add indexes
            $table->index('user_id'); // For filtering by user
            $table->index('category'); // For filtering by category
            $table->index('created_at'); // For sorting by date
            $table->index(['user_id', 'category']); // Composite index for user + category queries
            $table->index(['category', 'created_at']); // For category listings sorted by date
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
