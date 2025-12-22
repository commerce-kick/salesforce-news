<?php

use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

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
                ->paginate(10), // 2 is too small, use 10-15
        ),
        'filters' => [
            'category' => $category,
            'tag' => $tag,
        ],
    ]);
})->name('home');

Route::get('/post/{slug}', function (string $slug) {
    $post = Post::where('slug', $slug)->firstOrFail();

    return Inertia::render('post/show', [
        'post' => $post->load(['user', 'tags', 'media']),
    ]);
})->name('post.show');

Route::passkeys();

// require __DIR__.'/settings.php';
