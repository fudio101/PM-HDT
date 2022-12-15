<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'user_id',
        'subscription_package_id',
        'subscription_package_price',
        'subscription_package_duration'
    ];
}
