<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FollowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, \App\Models\User $user)
    {
        $request->user()->toggleFollow($user);
        return inertia()->back();
    }
}
