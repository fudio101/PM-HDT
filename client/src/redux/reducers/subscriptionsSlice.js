import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import globalApi from "../../api/globalApi";
import subscriptionApi from "../../api/subscriptionApi";

const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState: {
        status: "idle",
        data: [],
        vndToUsdRate: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubscriptionList.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
            })
            .addCase(getSubscriptionList.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.subscription_packages;
            })
            .addCase(getVndToUsdRate.pending, (state, action) => {
                state.status = "loading";
                state.vndToUsdRate = null;
            })
            .addCase(getVndToUsdRate.fulfilled, (state, action) => {
                state.status = "idle";
                state.vndToUsdRate = action.payload.usd;
            });
    },
});

export const getSubscriptionList = createAsyncThunk(
    "subscriptions/getList",
    async () => {
        const res = await subscriptionApi.getSubscriptionPackages();
        return res.data;
    }
);

export const getVndToUsdRate = createAsyncThunk(
    "subscriptions/getVndToUsdRate",
    async (input, { getState }) => {
        const vndToUsdRate = getState().subscriptions.vndToUsdRate;
        if (vndToUsdRate) return vndToUsdRate;
        const res = await globalApi.vndToUsdRate();
        return res.data;
    }
);

export default subscriptionsSlice;
