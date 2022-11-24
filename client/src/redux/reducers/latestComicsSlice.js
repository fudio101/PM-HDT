import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import comicApi from "../../api/comicApi";

const latestComicsSlice = createSlice({
    name: "latestComics",
    initialState: {
        status: "idle",
        data: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLatestComics.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getLatestComics.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data;
            });
    },
});

export const getLatestComics = createAsyncThunk(
    "latestComics/getList",
    async (number = 20, thunkApi) => {
        const res = await comicApi.getNewComic(number);
        return res.data;
    }
);

export default latestComicsSlice;
