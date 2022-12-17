<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = $this->user;
        return [
            "id" => $this->id,
            "user_name" => $user->name,
            "user_email" => $user->email,
            "subscription_package_name" => $this->subscriptionPackage->name,
            "subscription_package_price" => $this->subscription_package_price,
            "subscription_package_duration" => $this->subscription_package_duration,
            "subscription_package_duration_text" => $this->subscription_package_duration_text,
            "status" => $this->status,
            "created_at" => $this->created_at
        ];
    }
}
