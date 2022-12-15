<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

//use Illuminate\Auth\MustVerifyEmail;

//use Illuminate\Database\Eloquent\Relations\BelongsTo;

//use PHPOpenSourceSaver\JWTAuth\Http\Middleware\RefreshToken;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, \Illuminate\Auth\MustVerifyEmail;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'registration_expires_on'
    ];

    protected $appends = [
//        'image_url',
        'is_verified'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'deleted_at',
        'created_at',
        'updated_at',
        'email_verified_at',
//        'remember_token',
    ];

    public function image(): Attribute
    {
        return Attribute::make(
            get: static fn(
                $value,
                $attributes
            ) => empty($image = preg_grep("/^users\/{$attributes['id']}\./", Storage::files('users/'))) ?
                null :
                array_shift($image)

        );
    }

    public function getIsVerifiedAttribute()
    {
        return !is_null($this->email_verified_at);
    }

    public function imageUrl(): Attribute
    {
        return Attribute::make(
            get: static fn(
                $value,
                $attributes
            ) => empty($image = preg_grep("/^users\/{$attributes['id']}\./", Storage::files('users/'))) ?
                null :
                Storage::temporaryUrl(array_shift($image), now()->addMinutes(30))

        );
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'role_id' => $this->role_id
        ];
    }
}
