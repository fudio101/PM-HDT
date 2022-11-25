import { createSlice } from "@reduxjs/toolkit";
import {
  getAllComic,
  update,
  delComic,
  newComic,
  getComic,
  newChapter,
} from "../actions/comicAction";

const initialState = {
  loading: false,
  comic: [],
  error: null,
  success: false,
};

const comicSlice = createSlice({
  name: "comic",
  initialState,
  reducers: {
    refresh(state) {
      state.success = false;
      state.error = null;
      state.comic = [];
      state.loading = false;
    },
  },
  extraReducers: {
    //get comic

    [getComic.pending]: (state) => {
      state.loading = true;
    },
    [getComic.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comic = payload;
      state.success = true;
    },
    [getComic.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //add comic

    [newComic.pending]: (state) => {
      state.loading = true;
    },
    [newComic.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      // state.comic = state.comic.push(payload);
    },
    [newComic.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //update

    [update.pending]: (state) => {
      state.loading = true;
    },
    [update.fulfilled]: (state, action) => {
      state.loading = false;
      state.comic = action.payload;
    },
    [update.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // getAll comic
    [getAllComic.pending]: (state) => {
      state.loading = true;
    },
    [getAllComic.fulfilled]: (state, { payload }) => {
      return {
        loading: false,
        comic: payload,
        success: true,
      };
    },
    [getAllComic.rejected]: (state, { payload }) => {
      return { loading: false, error: payload };
    },

    // delete comic
    [delComic.pending]: (state) => {
      state.loading = true;
    },
    [delComic.fulfilled]: (state, { payload }) => {
      return {
        loading: false,
        success: true,
      };
    },
    [delComic.rejected]: (state, { payload }) => {
      return { loading: false, error: payload };
    },

    //add comic ep

    [newChapter.pending]: (state) => {
      state.loading = true;
    },
    [newChapter.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      // state.comic = state.comic.push(payload);
    },
    [newChapter.rejected]: (state, { payload }) => {
      return {
        loading: false,
        error: payload,
      };
    },
  },
});

export const comicReducerAction = comicSlice.actions;
export default comicSlice.reducer;
