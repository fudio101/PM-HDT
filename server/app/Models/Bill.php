<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Bill extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'user_id',
        'subscription_package_id',
        'subscription_package_price',
        'subscription_package_duration',
        'subscription_package_duration_text',
    ];

    protected $hidden = [
        'updated_at',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function subscriptionPackage(): HasOne
    {
        return $this->hasOne(SubscriptionPackage::class, 'id', 'subscription_package_id');
    }
}
