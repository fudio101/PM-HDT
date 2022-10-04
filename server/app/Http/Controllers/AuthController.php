<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'forgotPassword', 'resetPassword']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param  LoginRequest  $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->all(['email', 'password']);

        if (!$token = Auth::attempt($credentials)) {
            return response()->json([
                    'message' => 'Unauthorized'
                ]
                , ResponseAlias::HTTP_UNAUTHORIZED);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function me()
    {
        return response()->json(Auth::user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string  $token
     *
     * @return JsonResponse
     */
    protected function respondWithToken(string $token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * Change password.
     *
     * @param  ChangePasswordRequest  $request
     *
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        #Match The Old Password
        if (!Hash::check($request->input('old_password'), Auth::user()->password)) {

            return response()->json([
                    'message' => 'Wrong old password'
                ]
                , ResponseAlias::HTTP_UNAUTHORIZED);
        }

        if ($request->input('new_password') === $request->input('old_password')) {

            return response()->json([
                    'message' => 'The new password must not be the same as the old password'
                ]
                , ResponseAlias::HTTP_CONFLICT);
        }

        #Update the new Password
        User::query()->where('id', Auth::user()->id)->update([
            'password' => Hash::make($request->input('new_password'))
        ]);

        return response()->json([
            'message' => 'Password changed successfully!',
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * @param  ForgotPasswordRequest  $request
     * @return JsonResponse
     */
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)], ResponseAlias::HTTP_OK)
            : response()->json(['message' => __($status)], ResponseAlias::HTTP_NOT_FOUND);
    }

    /**
     * @param  ResetPasswordRequest  $request
     * @return JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ]);

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)], ResponseAlias::HTTP_OK)
            : response()->json(['message' => __($status)], ResponseAlias::HTTP_NOT_FOUND);
    }
}
