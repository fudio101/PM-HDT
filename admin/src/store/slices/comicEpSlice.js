import { createSlice } from "@reduxjs/toolkit";
import {
  newChapter,
  deleteComicEP,
  updateComicEP,
  getComicEpByID,
} from "../actions/comicEpAction";

const initialState = {
  episodes: [],
  error: null,
  success: false,
};

const comicEpSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {},
  extraReducers: {
    //add comic ep
    [newChapter.pending]: (state) => {
      state.loading = true;
    },
    [newChapter.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [newChapter.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete comic eposode
    [deleteComicEP.pending]: (state) => {
      state.loading = true;
    },
    [deleteComicEP.fulfilled]: (state, { payload }) => {
      return {
        loading: false,
        success: true,
      };
    },
    [deleteComicEP.rejected]: (state, { payload }) => {
      return { loading: false, error: payload };
    },

    //get comic Episode

    [getComicEpByID.pending]: (state) => {
      state.loading = true;
    },
    [getComicEpByID.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comic = payload;
      state.success = true;
    },
    [getComicEpByID.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //update comic episode

    [updateComicEP.pending]: (state) => {
      state.loading = true;
    },
    [updateComicEP.fulfilled]: (state, action) => {
      state.loading = false;
      state.comic = action.payload;
    },
    [updateComicEP.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default comicEpSlice.reducer;
