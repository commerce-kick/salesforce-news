<?php

use App\Http\Controllers\FollowController;
use App\Models\OpenPosition;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    $category = $request->query('category');
    $tag = $request->query('tag');

    return Inertia::render('welcome', [
        'posts' => Inertia::scroll(
            fn() => Post::query()
                ->published()
                ->with(['user:id,name,email', 'tags:id,slug,name', 'media']) // Select only needed columns
                ->when($category, fn(Builder $query) => $query->where('category', $category))
                ->when($tag, fn(Builder $query) => $query->whereHas('tags', fn(Builder $q) => $q->where(
                    'slug->en',
                    $tag,
                )))
                ->latest()
                ->paginate(), // 2 is too small, use 10-15
        ),
        'filters' => [
            'category' => $category,
            'tag' => $tag,
        ],
    ]);
})->name('home');

Route::get('/jobs', function (Request $request) {
    $category = $request->query('category');
    $tag = $request->query('tag');

    return Inertia::render('jobs/index', [
        'jobs' => Inertia::scroll(
            fn() => OpenPosition::query()
                ->published()
                ->with(['user', 'tags', 'media']) // Select only needed columns
                ->when($category, fn(Builder $query) => $query->where('category', $category))
                ->when($tag, fn(Builder $query) => $query->whereHas('tags', fn(Builder $q) => $q->where(
                    'slug->en',
                    $tag,
                )))
                ->latest()
                ->paginate(), // 2 is too small, use 10-15
        ),
        'filters' => [
            'category' => $category,
            'tag' => $tag,
        ],
    ]);
})->name('jobs');

Route::get('/post/{slug}', function (string $slug) {
    $post = Post::where('slug', $slug)->firstOrFail();

    $html = $post->renderRichContent('content');

    return Inertia::render('post/show', [
        'post' => $post->load(['user', 'tags', 'media']),
        'htmlContent' => $html,
    ]);
})->name('post.show');

Route::get('/job/{job}', function (OpenPosition $job) {
    $html = $job->renderRichContent('content');

    return Inertia::render('jobs/show', [
        'job' => $job->load(['user', 'tags', 'media']),
        'htmlContent' => $html,
    ]);
})->name('jobs.show');

Route::get('/user/{user}', function (User $user) {
    if (auth()->check()) {
        $isFollowing = auth()->user()->isFollowing($user);
    } else {
        $isFollowing = false;
    }

    $followers = $user->followers()->limit(12)->get();

    return Inertia::render('user/profile', [
        'user' => $user,
        'posts' => Inertia::scroll(
            fn() => $user->posts()->published()->with(['tags', 'media', 'user'])->latest()->paginate(10),
        ),
        'isFollowing' => $isFollowing,
        'followers' => $followers,
    ]);
})->name('user.profile');

Route::post('/user/{user}/follow', FollowController::class)->name('user.follow');

Route::passkeys();

// require __DIR__.'/settings.php';
