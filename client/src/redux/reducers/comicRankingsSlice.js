import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import comicApi from "../../api/comicApi";

const comicRankingsSlice = createSlice({
    name: "comicRankings",
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
        comicRankingsFilterCategoryChange: (state, action) => {
            state.filters.category = parseInt(action.payload);
        },
        comicRankingsFilterStatusChange: (state, action) => {
            state.filters.status = action.payload;
        },
        comicRankingsFilterCountryChange: (state, action) => {
            state.filters.country = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(comicRankingsByDay.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
            })
            .addCase(comicRankingsByDay.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data;
            })
            .addCase(comicRankingsByMonth.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
            })
            .addCase(comicRankingsByMonth.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data;
            })
            .addCase(comicRankingsAll.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
            })
            .addCase(comicRankingsAll.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data;
            });
    },
});

export const comicRankingsByDay = createAsyncThunk(
    "comicRankings/byDay",
    async (day, thunkApi) => {
        const res = await comicApi.getViewStatisticsByDay(day);
        return res.data;
    }
);

export const comicRankingsByMonth = createAsyncThunk(
    "comicRankings/byMonth",
    async (month, thunkApi) => {
        const res = await comicApi.getViewStatisticsByMonth(month);
        return res.data;
    }
);

export const comicRankingsAll = createAsyncThunk(
    "comicRankings/all",
    async (input, thunkApi) => {
        const res = await comicApi.getViewStatisticsAll();
        return res.data;
    }
);

const { actions } = comicRankingsSlice;

export const {
    comicRankingsFilterCategoryChange,
    comicRankingsFilterStatusChange,
    comicRankingsFilterCountryChange,
    latestComicsFilterItemsPerPageChange,
} = actions;

export default comicRankingsSlice;
