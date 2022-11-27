import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import globalApi from "../../api/globalApi";

const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        status: "idle",
        data: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCountryList.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
            })
            .addCase(getCountryList.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data;
            });
    },
});

export const getCountryList = createAsyncThunk(
    "countries/getList",
    async () => {
        const res = await globalApi.countryList();
        return res.data;
    }
);

export default countriesSlice;
