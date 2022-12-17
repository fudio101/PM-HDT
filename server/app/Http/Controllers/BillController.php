<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBillRequest;
use App\Http\Requests\UpdateBillRequest;
use App\Http\Resources\BillResource;
use App\Models\Bill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class BillController extends Controller
{
    /**
     * Use middleware.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->authorizeResource(Bill::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $bills = BillResource::collection(Bill::all());

        return \response()->json(['bills' => $bills], ResponseAlias::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBillRequest  $request
     * @return Response
     */
    public function store(StoreBillRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  Bill  $bill
     * @return JsonResponse
     */
    public function show(Bill $bill)
    {
        $data = new BillResource($bill);
        return \response()->json(['bill' => $data], ResponseAlias::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBillRequest  $request
     * @param  Bill  $bill
     * @return Response
     */
    public function update(UpdateBillRequest $request, Bill $bill)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Bill  $bill
     * @return Response
     */
    public function destroy(Bill $bill)
    {
        //
    }
}
