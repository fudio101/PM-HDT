<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientComicInforResource;
use App\Http\Resources\ClientComicResource;
use App\Http\Resources\ClientEpidoseImagesResource;
use App\Models\Bill;
use App\Models\Category;
use App\Models\Comic;
use App\Models\ComicEpisodeView;
use App\Models\ComicEpisodeViewByDay;
use App\Models\ComicEpisodeViewByMonth;
use App\Models\SubscriptionPackage;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ClientController extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api',
            [
                'only' => [
                    'showEpisodeImages',
                    'acceptEpisodeView',
                    'changeUserName',
                    'buySubscriptionPackage',
                    'getUserStatistic',
                    'rateComic'
                ]
            ]);
    }

    /**
     * Show all comics in a category
     *
     * @param  Category  $category
     * @return JsonResponse
     */
    public function showCategory(Category $category): JsonResponse
    {
        return response()->json([
            'data' => $category->comics,
        ], ResponseAlias::HTTP_OK);
    }

    public function search(Request $request): JsonResponse
    {
        $data = ClientComicResource::collection(Comic::search($request->search)->get());//->makeHidden('episodes');
        return response()->json([
            'data' => $data
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * @param  Comic  $comic
     * @return JsonResponse
     */
    public function getComic(Comic $comic): JsonResponse
    {
        $data = new ClientComicInforResource($comic);
        return response()->json(['data' => $data]);
    }

    /**
     * @param  Comic  $comic
     * @param  $episode_number
     * @return JsonResponse
     */
    public function showEpisodeImages(Comic $comic, $episode_number): JsonResponse
    {
        $user = User::query()->find(Auth::user()->id);
        $roleId = $user->getAttribute('role_id');

        $comicEpisode = $comic->getEpisode($episode_number);

        if ($roleId !== 1 && $roleId !== 2) {
            if (is_null($user->getAttribute('email_verified_at'))) {
                return response()->json(['message' => "Bạn phải xác thực email để có thể đọc truyện"],
                    ResponseAlias::HTTP_METHOD_NOT_ALLOWED);
            }

            $episode = $comic->episodes->slice(2, 1)->first();
            if ($episode) {
                $episodeNum = $episode->episode_number;
                if ($episode_number > $episodeNum) {
                    $registrationExpiresOn = $user->getAttribute('registration_expires_on');
                    if (is_null($registrationExpiresOn) || Carbon::now()->gt(Carbon::make($registrationExpiresOn)->addDay())) {
                        return response()->json(['message' => "Bạn cần mua gói thành viên để tiếp tục đọc tập này"],
                            ResponseAlias::HTTP_PAYMENT_REQUIRED);
                    }
                }
            }
        }


        if ($comicEpisode) {
            $comicEpisodeViewId = ComicEpisodeView::createViewLog($comicEpisode);
            $data = new ClientEpidoseImagesResource($comicEpisode);
            return response()->json([
                'data' => $data,
                'view' => [
                    'cooldown' => $comicEpisode->cooldown,
                    'id' => $comicEpisodeViewId
                ]
            ],
                ResponseAlias::HTTP_OK);
        }


        return response()->json([
            'message' => "Comic episode can't be found",
        ], ResponseAlias::HTTP_BAD_REQUEST);
    }

    public function acceptEpisodeView(Comic $comic, $episode_number, Request $request): JsonResponse
    {
        $validate = $request->validate([
            'view_id' => 'required|exists:comic_episode_views,id',
        ]);

        $user = User::query()->find(Auth::user()->id);
        $roleId = $user->getAttribute('role_id');

        $comicEpisode = $comic->getEpisode($episode_number);

        if ($roleId !== 1 && $roleId !== 2) {
            if (is_null($user->getAttribute('email_verified_at'))) {
                return response()->json(['message' => "Bạn phải xác thực email để thực hiện hành động này"],
                    ResponseAlias::HTTP_METHOD_NOT_ALLOWED);
            }

            $episode = $comic->episodes->slice(2, 1)->first();
            if ($episode) {
                $episodeNum = $episode->episode_number;
                if ($episode_number > $episodeNum) {
                    $registrationExpiresOn = $user->getAttribute('registration_expires_on');
                    if (is_null($registrationExpiresOn) || Carbon::now()->gt(Carbon::make($registrationExpiresOn)->addDay())) {
                        return response()->json(['message' => "Bạn cần mua gói thành viên thực hiện hành động này"],
                            ResponseAlias::HTTP_PAYMENT_REQUIRED);
                    }
                }
            }
        }

        if (ComicEpisodeView::accepotViewLog($comicEpisode, $validate["view_id"])) {
            return response()->json(['message' => "Accept view successfully",], ResponseAlias::HTTP_OK);
        }

        return response()->json([
            'message' => "Can't accept view",
        ], ResponseAlias::HTTP_BAD_REQUEST);
    }

    /**
     * @return JsonResponse
     */
    public function getJustUpdatedComics(Request $request): JsonResponse
    {
        $input = $request->validate(['number' => 'integer']);
        $number = $input['number'] ?? 20;

        $comics = Comic::all()->sortByDesc('updated_time')->take($number);

//        $comics->sortByDesc('updated_time');

        $data = ClientComicResource::collection($comics);

        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getComicsByCategory(Category $category): JsonResponse
    {
        $comics = $category->comics;
        $data = ClientComicResource::collection($comics);
        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getViewStatisticsByDay(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'day' => 'required|date_format:Y-m-d',
            'limit' => 'integer'
        ]);

        $day = $validate['day'];
        $limit = $validate['limit'] ?? -1;

        $comics = Comic::getComicViewStatisticsByDay($day, $limit);

        $data = ClientComicResource::collection($comics);

        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getViewStatisticsByMonth(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'month' => 'required|date_format:Y-m',
            'limit' => 'integer'
        ]);

        $month = $validate['month'];
        $limit = $validate['limit'] ?? -1;

        $comics = Comic::getComicViewStatisticsByMonth($month, $limit);

        $data = ClientComicResource::collection($comics);

        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getViewStatistics(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'limit' => 'integer'
        ]);

        $limit = $validate['limit'] ?? -1;

        $comics = Comic::getComicViewStatistics($limit);

        $data = ClientComicResource::collection($comics);

        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getTotalViewsByMonths(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'month' => 'required|date_format:Y-m',
            'month1' => 'required|date_format:Y-m',
        ]);

        $month = $validate['month'];
        $month1 = $validate['month1'];

        $data = ComicEpisodeViewByMonth::getTotalComicViewsByMonths($month, $month1);

        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getTotalViewsByDays(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'day' => 'required|date_format:Y-m-d',
            'day1' => 'required|date_format:Y-m-d',
        ]);

        $day = $validate['day'];
        $day1 = $validate['day1'];

        $data = ComicEpisodeViewByDay::getTotalComicViewsByDays($day, $day1);

        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getTotalViews(): JsonResponse
    {
        $month = ComicEpisodeViewByMonth::getTotalMonthComicViews();
        $today = ComicEpisodeViewByDay::getTotalTodayComicViews();


        return response()->json([
            'data' => [
                'month' => $month,
                'today' => $today
            ]
        ], ResponseAlias::HTTP_OK);
    }

    public function changeUserName(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|min:3|max:50'
            ]);

            $user = User::query()->find(Auth::user()->id);

            $user->name = $request->input('name');
            $user->save();

            return response()->json([
                'message' => 'Đổi tên thành công',
                'user' => $user
            ], ResponseAlias::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param  SubscriptionPackage  $subscriptionPackage
     * @return JsonResponse
     */
    public function buySubscriptionPackage(SubscriptionPackage $subscriptionPackage)
    {
        try {
            $user = Auth::user();
            $duration = $subscriptionPackage->getAttribute("duration");

            Bill::query()->create([
                'user_id' => $user->id,
                'subscription_package_id' => $subscriptionPackage->getKey(),
                'subscription_package_price' => $subscriptionPackage->getAttribute("price"),
                'subscription_package_duration' => $duration,
                'subscription_package_duration_text' => $subscriptionPackage->getAttribute("duration_text"),
            ]);

            $registrationExpiresOn = $user->registration_expires_on ?
                (
                Carbon::now()->gt(Carbon::make($user->registration_expires_on)->addDay()) ?
                    Carbon::now() :
                    Carbon::make($user->registration_expires_on)
                ) :
                Carbon::now();

            $registrationExpiresOn->addDays($duration);

            User::query()->find($user->id)->update(['registration_expires_on' => $registrationExpiresOn]);

            return response()->json(['message' => "Mua gói thành viên thành công"], ResponseAlias::HTTP_OK);

        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    public function getTotalIncomes(): JsonResponse
    {
        $totalIncomeThisMonth = Bill::totalIncomeThisMonth();
        $totalIncomeToday = Bill::totalIncomeToday();

        return response()->json([
            'data' => [
                'month' => $totalIncomeThisMonth,
                'today' => $totalIncomeToday
            ]
        ], ResponseAlias::HTTP_OK);
    }

    public function getTotalIncomeByMonths(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'month' => 'required|date_format:Y-m',
            'month1' => 'required|date_format:Y-m',
        ]);

        $month = $validate['month'];
        $month1 = $validate['month1'];

        $totalIncomeByMonths = Bill::getTotalIncomeByMonths($month, $month1);

        return response()->json(['total_income_by_months' => $totalIncomeByMonths], ResponseAlias::HTTP_OK);
    }

    public function getUserStatistic()
    {
        $users = User::query()->where('role_id', '=', 3)->get();

        $notVerified = 0;
        $unpaid = 0;
        $paid = 0;
        foreach ($users as $user) {
            if (is_null($user->email_verified_at)) {
                ++$notVerified;
            } else {
                $registrationExpiresOn = $user->registration_expires_on;
                if (is_null($registrationExpiresOn) || Carbon::make($registrationExpiresOn)->addDay()->floorDay()->lt(now())) {
                    ++$unpaid;
                } else {
                    ++$paid;
                }
            }
        }

        return response()->json([
            'not_verified' => $notVerified,
            'unpaid' => $unpaid,
            'paid' => $paid,
        ], ResponseAlias::HTTP_OK);
    }

    public function rateComic(Request $request, Comic $comic)
    {
        $request->validate(['rating' => 'required|integer|min:0|max:5']);
        $comic->rateOnce($request->input('rating'));
        return response(null, ResponseAlias::HTTP_CREATED);
    }
}
