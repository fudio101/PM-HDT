<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionPackageRequest;
use App\Http\Requests\UpdateSubscriptionPackageRequest;
use App\Models\SubscriptionPackage;
use Exception;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use function response;

class SubscriptionPackageController extends Controller
{
  /**
   * Use middleware.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api', ['except' => ['index']]);

    $this->authorizeResource(SubscriptionPackage::class);
  }

  /**
   * Display a listing of the resource.
   *
   * @return JsonResponse
   */
  public function index(): JsonResponse
  {
    $subscriptionPackages = SubscriptionPackage::all();
    return response()->json(['subscription_packages' => $subscriptionPackages], ResponseAlias::HTTP_OK);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  StoreSubscriptionPackageRequest  $request
   * @return JsonResponse
   */
  public function store(StoreSubscriptionPackageRequest $request)
  {
    try {
      $subscriptionPackage = SubscriptionPackage::query()->create($request->only([
        'name',
        'price',
        'duration',
        'description'
      ]));

      return response()->json([
        'message' => 'Successfully added new subscription package!',
        'subscription_package' => $subscriptionPackage
      ], ResponseAlias::HTTP_CREATED);
    } catch (Exception $exception) {
      return response()->json([
        'message' => $exception->getMessage(),
      ], ResponseAlias::HTTP_BAD_REQUEST);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  SubscriptionPackage  $subscriptionPackage
   * @return JsonResponse
   */
  public function show(SubscriptionPackage $subscriptionPackage): JsonResponse
  {
    return response()->json(['subscription_package' => $subscriptionPackage], ResponseAlias::HTTP_OK);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  UpdateSubscriptionPackageRequest  $request
   * @param  SubscriptionPackage  $subscriptionPackage
   * @return JsonResponse
   */
  public function update(UpdateSubscriptionPackageRequest $request, SubscriptionPackage $subscriptionPackage)
  {
    try {
      $subscriptionPackage->update($request->only([
        'name',
        'price',
        'duration',
        'description'
      ]));
      return response()->json([
        'message' => 'Successful update',
        'subscription_package' => $subscriptionPackage
      ], ResponseAlias::HTTP_OK);
    } catch (Exception $exception) {
      return response()->json(['message' => $exception->getMessage()], ResponseAlias::HTTP_BAD_REQUEST);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  SubscriptionPackage  $subscriptionPackage
   * @return JsonResponse
   */
  public function destroy(SubscriptionPackage $subscriptionPackage)
  {
    try {
      $subscriptionPackage->delete();
      return response()->json(['message' => 'Successful delete'], ResponseAlias::HTTP_OK);
    } catch (Exception $exception) {
      return response()->json(['message' => $exception->getMessage()], ResponseAlias::HTTP_BAD_REQUEST);
    }
  }
}
