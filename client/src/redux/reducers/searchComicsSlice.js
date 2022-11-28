import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import comicApi from "../../api/comicApi";

const searchComicsSlice = createSlice({
    name: "searchComics",
    initialState: {
        searchKey: "",
        filters: {
            category: 0,
            status: -1,
            country: 0,
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
        searchComicsFilterCountryChange: (state, action) => {
            state.filters.country = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchComics.pending, (state, action) => {
                state.status = "loading";
                // state.data = [];
            })
            .addCase(searchComics.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data;
                state.searchKey = action.payload.searchKey;
            });
    },
});

export const searchComics = createAsyncThunk(
    "filters/search",
    async (searchKey, { getState }) => {
        let state = getState();
        let oldSearchKey = state.searchComics.searchKey;

        if (searchKey !== oldSearchKey) {
            const { data } = await comicApi.search(searchKey);
            return { searchKey: searchKey, data: data.data };
        }

        return { searchKey: searchKey, data: state.searchComics.data };
    }
);

const { actions } = searchComicsSlice;

export const {
    searchComicsFilterCategoryChange,
    searchComicsFilterStatusChange,
    searchComicsFilterCountryChange: searchComicsFilterNationChange,
} = actions;

export default searchComicsSlice;
