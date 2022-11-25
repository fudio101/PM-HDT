import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import comicApi from "../../api/comicApi";

const searchComicsSlice = createSlice({
    name: "search",
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
        seachFilterCategoryChange: (state, action) => {
            state.filters.category = parseInt(action.payload);
        },
        seachFilterStatusChange: (state, action) => {
            state.filters.status = action.payload;
        },
        seachFilterNationChange: (state, action) => {
            state.filters.nation = action.payload;
        },
        // setData: (state, action) => {
        //     state.data = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchComics.pending, (state, action) => {
                state.status = "pending";
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
    seachFilterCategoryChange,
    seachFilterStatusChange,
    seachFilterNationChange,
    // setData,
} = actions;

export default searchComicsSlice;
