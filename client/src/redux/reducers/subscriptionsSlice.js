import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import subscriptionApi from "../../api/subscriptionApi";

const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState: {
        status: "idle",
        data: [],
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

export default subscriptionsSlice;
