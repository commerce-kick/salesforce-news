<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
    // User can only see their own posts in the list
    public function viewAny(User $user): bool
    {
        return true; // Allow access to the list page
    }

    // User can only view their own post
    public function view(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    // Any authenticated user can create posts
    public function create(User $user): bool
    {
        return true;
    }

    // User can only update their own post
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    // User can only delete their own post
    public function delete(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }
}
