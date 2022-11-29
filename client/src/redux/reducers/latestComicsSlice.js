import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import comicApi from "../../api/comicApi";

const latestComicsSlice = createSlice({
    name: "latestComics",
    initialState: {
        filters: {
            category: 0,
            status: -1,
            country: 0,
        },
        data: [],
        status: "idle",
    },
    reducers: {
        latestComicsFilterCategoryChange: (state, action) => {
            state.filters.category = parseInt(action.payload);
        },
        latestComicsFilterStatusChange: (state, action) => {
            state.filters.status = action.payload;
        },
        latestComicsFilterCountryChange: (state, action) => {
            state.filters.country = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLatestComics.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
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

const { actions } = latestComicsSlice;

export const {
    latestComicsFilterCategoryChange,
    latestComicsFilterStatusChange,
    latestComicsFilterCountryChange,
} = actions;

export default latestComicsSlice;
