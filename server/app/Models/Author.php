<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Author extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'user_id'
    ];

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($author) {
            $author->user_id = Auth::user()->id;
        });
    }
}
