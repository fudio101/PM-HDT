import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import comicApi from "../../api/comicApi";

const searchComicsSlice = createSlice({
    name: "searchComics",
    initialState: {
        filters: {
            category: 0,
            status: -1,
            nation: 0,
        },
        data: [],
        status: "idle",
    },
    reducers: {
        searchComicsFilterCategoryChange: (state, action) => {
            state.filters.category = parseInt(action.payload);
        },
        searchComicsFilterStatusChange: (state, action) => {
            state.filters.status = action.payload;
        },
        searchComicsFilterNationChange: (state, action) => {
            state.filters.nation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchComics.pending, (state, action) => {
                state.status = "pending";
                state.data = [];
            })
            .addCase(searchComics.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload;
            });
    },
});

export const searchComics = createAsyncThunk(
    "filters/search",
    async (searchKey, thunkApi) => {
        const { data } = await comicApi.search(searchKey);
        return data.data;
    }
);

const { actions } = searchComicsSlice;

export const {
    searchComicsFilterCategoryChange,
    searchComicsFilterStatusChange,
    searchComicsFilterNationChange,
} = actions;

export default searchComicsSlice;
