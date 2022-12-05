<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\Auth;

trait AddUser
{

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($model) {
            $model->user_id = Auth::user()->id;
        });

//        static::updating(function ($model) {
//            $model->user_id = Auth::user()->id;
//        });
    }
}
