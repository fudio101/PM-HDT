import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chapterApi from "../../api/chapterApi";

const chapterSlice = createSlice({
    name: "chapter",
    initialState: {
        data: {},
        status: "idle",
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChapter.pending, (state, action) => {
                state.status = "loading";
                state.data = {};
            })
            .addCase(getChapter.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data;
            });
    },
});

export const getChapter = createAsyncThunk(
    "chapter/get",
    async (input, thunkApi) => {
        const res = await chapterApi.getChapter(input.comicSlug, input.chapter);
        return res.data;
    }
);

export default chapterSlice;
