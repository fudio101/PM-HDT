import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import globalApi from "../../api/globalApi";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        status: "idle",
        data: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
            })
            .addCase(getCategoryList.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data;
            });
    },
});

export const getCategoryList = createAsyncThunk(
    "categories/getList",
    async () => {
        const res = await globalApi.categoryList();
        return res.data;
    }
);

export default categoriesSlice;
