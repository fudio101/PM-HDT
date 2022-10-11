<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\Auth;

trait AddUser
{

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($author) {
            $author->user_id = Auth::user()->id;
        });
    }
}
