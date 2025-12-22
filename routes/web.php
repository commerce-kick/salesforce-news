<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

Route::get('/', function (Request $request) {

    $category = $request->query('category');

    return Inertia::render('welcome', [
        'posts' =>  Inertia::scroll(fn () => Post::with(['user', 'tags', 'media'])->when($category, function (Builder $query, string $category) {
        $query->where('category', $category);
    })->latest()->paginate())
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
