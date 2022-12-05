import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chapterApi from "../../api/chapterApi";

const chapterSlice = createSlice({
    name: "chapter",
    initialState: {
        previousChapter: undefined,
        nextChapter: undefined,
        data: {
            list_of_episode_number: [],
        },
        viewInfor: {
            cooldown: 0,
            id: 0,
        },
        acceptedView: false,
        status: "idle",
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChapter.pending, (state, action) => {
                state.status = "loading";
                state.data = {};
            })
            .addCase(getChapter.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.viewInfor = action.payload.view;

                if (state.data && state.data.list_of_episode_number) {
                    let index = state.data.list_of_episode_number.indexOf(
                        state.data.episode_number
                    );

                    let length = state.data.list_of_episode_number.length;
                    if (index >= 0 && index < length) {
                        state.previousChapter =
                            index === 0
                                ? undefined
                                : state.data.list_of_episode_number[index - 1];
                        state.nextChapter =
                            index === length - 1
                                ? undefined
                                : state.data.list_of_episode_number[index + 1];
                    } else {
                        state.previousChapter = undefined;
                        state.nextChapter = undefined;
                    }
                }

                state.status = "idle";
            })
            .addCase(acceptView.pending, (state, action) => {
                state.acceptedView = false;
            })
            .addCase(acceptView.fulfilled, (state, action) => {
                state.acceptedView = true;
            })
            .addCase(acceptView.rejected, (state, action) => {
                state.acceptedView = false;
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

export const acceptView = createAsyncThunk(
    "chapter/acceptView",
    async (input, thunkApi) => {
        const res = await chapterApi.acceptView(
            input.comicSlug,
            input.chapter,
            input.viewId
        );
        return res.data;
    }
);

export default chapterSlice;
