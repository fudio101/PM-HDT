import { createSlice } from "@reduxjs/toolkit";
import { getAllAuthor, getAuthor, newAuthor } from "../actions/authorAction";

const initialState = {
  loading: false,
  author: [],
  error: null,
  success: false,
};

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: {
    //get author

    [getAuthor.pending]: (state) => {
      state.loading = true;
    },
    [getAuthor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.author = payload;
      state.success = true;
    },
    [getAuthor.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //add author

    [newAuthor.pending]: (state) => {
      state.loading = true;
    },
    [newAuthor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      // state.author = state.author.push(payload);
    },
    [newAuthor.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //update

    // [newAuthor.pending]: (state) => {
    //   state.loading = true;
    // },
    // [newAuthor.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.author = action.payload;
    // },
    // [newAuthor.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // getAll author
    [getAllAuthor.pending]: (state) => {
      state.loading = true;
    },
    [getAllAuthor.fulfilled]: (state, { payload }) => {
      return {
        loading: false,
        author: payload,
        success: true,
      };
    },
    [getAllAuthor.rejected]: (state, { payload }) => {
      return { loading: false, error: payload };
    },
  },
});

export default authorSlice.reducer;
