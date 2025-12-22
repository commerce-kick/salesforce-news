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
            $table->boolean('is_published')->default(false);
            $table->timestamps();

            // Indexes for performance
            $table->index('user_id');
            $table->index('category');
            $table->index('is_published');
            $table->index('created_at');

            // Composite indexes for common queries
            $table->index(['is_published', 'created_at']); // Published posts sorted by date
            $table->index(['category', 'is_published']); // Published posts by category
            $table->index(['user_id', 'is_published']); // User's published posts
            $table->index(['user_id', 'category']); // User's posts in category
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
