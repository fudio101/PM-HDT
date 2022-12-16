<?php

namespace App\Http\Controllers;

use App\Events\PasswordChanged;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\RegistrationVerificationRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Resources\MeResource;
use App\Http\Traits\ActivationCode;
use App\Models\User;
use App\Models\VerifyToken;
use App\Notifications\RegistrationVerificationEmail;
use Exception;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class AuthController extends Controller
{
    use ActivationCode;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => ['register', 'login', 'refresh', 'forgotPassword', 'resetPassword']]);
    }

    /**
     * Register a User.
     *
     * @param  RegisterRequest  $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            //create user
            $user = User::create(array_merge(
                $request->only(['name', 'email']),
                [
                    'password' => bcrypt($request->input('password')),
                    'role_id' => 3
                ]
            ));

            //create token
            $token = Auth::fromUser($user);

            //create a new activation code
            $activationCode = $this->generateVerificationCode();

            //create a new token
            $newToken = new VerifyToken;
            $newToken->code = $activationCode;
            $newToken->user_id = $user->id;
            $newToken->save();

            //email details
            $details = [
                'greeting' => 'Hi '.$request->input('name'),
                'body' => 'Use this activation code for verify your email address (this code valid in 15 minutes)',
                'activation_code' => $newToken->code,
                'thanks' => 'Thank you',
            ];

            //send email verify to user email
            Notification::send($user, new RegistrationVerificationEmail($details));

            return response()->json([
                'message' => 'Đăng ký tài khoản thành công, một mã kích hoạt đã được gửi tới email của bạn',
                'user' => $user,
                'access_token' => $token,
            ], ResponseAlias::HTTP_CREATED);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    public function verifyRegistration(RegistrationVerificationRequest $request)
    {
        try {
            $user = Auth::user();
            $findUser = User::query()->find($user->id);

            if ($findUser->email_verified_at) {
                return response()->json(['message' => 'Tài khoản của bạn đã được xác minh'], 200);
            }

            $inputCode = (int) $request->input('code');

            $token = VerifyToken::query()->where('user_id', '=', Auth::user()->id)->orderByDesc('created_at')->first();
            $activationCode = $token->code;
            $expires = Carbon::make($token->created_at)->addMinutes(15);

            $now = Carbon::now();
            if ($inputCode === $activationCode) {
                if ($now->lt($expires)) {
                    $findUser->email_verified_at = $now;
                    $findUser->save();

                    $token->status = 1;
                    $token->save();

                    return response()->json(['message' => 'Tài khoản đã xác minh thành công'], 200);
                }

                return response()->json(['message' => 'Mã kích hoạt đã hết hạn'], 400);
            }

            return response()->json(['message' => 'Sai mã kích hoạt'], 400);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    public function resendVerifyCode()
    {
        try {
            Carbon::setLocale('vi');
            $user = Auth::user();
            $findUser = User::query()->find($user->id);

            if ($findUser->email_verified_at) {
                return response()->json(['message' => 'Tài khoản của bạn đã được xác minh'], ResponseAlias::HTTP_OK);
            }

            $oldToken = VerifyToken::query()->where('user_id', '=',
                Auth::user()->id)->orderByDesc('created_at')->first();
            $expires = Carbon::make($oldToken->created_at)->addMinutes(5);

            $now = Carbon::now();
            if ($now->lt($expires)) {
                $temp = $now->diffForHumans($expires);
                return response()->json(['message' => "Làm ơn chờ {$temp} khi thử lại"], 400);
            }

            //create a new activation code
            $activationCode = $this->generateVerificationCode();

            //create a new token
            $newToken = new VerifyToken;
            $newToken->code = $activationCode;
            $newToken->user_id = $user->id;
            $newToken->save();

            //email details
            $details = [
                'greeting' => 'Hi '.$user->name,
                'body' => 'Use this activation code for verify your email address (this code valid in 15 minutes)',
                'activation_code' => $newToken->code,
                'thanks' => 'Thank you',
            ];

            //send email verify to user email
            Notification::send($user, new RegistrationVerificationEmail($details));

            return response()->json([
                'message' => 'Một mã kích hoạt mới đã gửi tới email của bạn',
            ], ResponseAlias::HTTP_CREATED);

        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param  LoginRequest  $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->all(['email', 'password']);

            if (!$token = Auth::attempt($credentials)) {
                return response()->json([
                        'message' => 'Unauthorized'
                    ]
                    , ResponseAlias::HTTP_UNAUTHORIZED);
            }

            return $this->respondWithToken($token);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], ResponseAlias::HTTP_OK);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function me()
    {
        return response()->json(new MeResource(Auth::user()));
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
        try {
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
            $user = User::query()->find(Auth::user()->id);

            $user->update([
                'password' => Hash::make($request->input('new_password'))
            ]);

            event(new PasswordChanged($user));

            return response()->json([
                'message' => 'Password changed successfully!',
            ], ResponseAlias::HTTP_OK);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], ResponseAlias::HTTP_OK);
        }
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
