<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use JsonSerializable;

class MeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request)
    {
        $role_id = $this->role_id;
        $registration_expires_on = $this->registration_expires_on;
        return array_merge(parent::toArray($request), [
            "registration_expires_on" => ($role_id === 1 || $role_id === 2) ? "Không giới hạn" :
                ($registration_expires_on ? Carbon::make($registration_expires_on)->format('d/m/Y') : "Đã hết hạn"),
        ]);
    }
}
