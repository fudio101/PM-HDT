import { createSlice } from "@reduxjs/toolkit";
import { getAllAuthorInfo } from "../actions/authorAction";

const initialState = {
  loading: false,
  authorInfo: {},
  error: null,
  success: false,
};

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: {
    // author info
    [getAllAuthorInfo.pending]: (state) => {
      state.loading = true;
    },
    [getAllAuthorInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authorInfo = payload;
    },
    [getAllAuthorInfo.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export default authorSlice.reducer;
