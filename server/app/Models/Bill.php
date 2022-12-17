<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

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

    public static function totalIncomeThisMonth()
    {
        $time = Carbon::now()->floorMonth();
        $time1 = $time->copy()->addMonth()->subMicrosecond();

        return self::query()
            ->where('created_at', '>=', $time)
            ->where('created_at', '<=', $time1)
            ->get()
            ->sum('subscription_package_price');
    }

    public static function totalIncomeToday()
    {
        $time = Carbon::now()->floorDay();
        $time1 = $time->copy()->addDay()->subMicrosecond();

        return self::query()
            ->where('created_at', '>=', $time)
            ->where('created_at', '<=', $time1)
            ->get()
            ->sum('subscription_package_price');
    }
}
