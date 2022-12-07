<?php

namespace App\Http\Traits;

use Exception;

trait ActivationCode
{

    /**
     * @param  int  $length
     * @return string
     * @throws Exception
     */
    public function generateVerificationCode(int $length = 6): string
    {
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        $code = '';
        for ($i = 0; $i < $length; $i++) {
            $code .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $code;
    }
}
