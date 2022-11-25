import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import comicApi from "../../api/comicApi";

const categoryComicsSlice = createSlice({
    name: "categoryComics",
    initialState: {
        filters: {
            status: -1,
            nation: 0,
        },
        data: [],
        status: "idle",
    },
    reducers: {
        categoryComicsFilterStatusChange: (state, action) => {
            state.filters.status = action.payload;
        },
        categoryComicsFilterNationChange: (state, action) => {
            state.filters.nation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryComics.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
            })
            .addCase(getCategoryComics.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data;
            });
    },
});

export const getCategoryComics = createAsyncThunk(
    "categoryComic/getList",
    async (categoryId, thunkApi) => {
        const res = await comicApi.getComicByCategory(categoryId);
        return res.data;
    }
);

const { actions } = categoryComicsSlice;

export const {
    categoryComicsFilterStatusChange,
    categoryComicsFilterNationChange,
} = actions;

export default categoryComicsSlice;
