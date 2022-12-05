import { createAsyncThunk } from "@reduxjs/toolkit";
import statisticAPI from "../../api/statisticAPI";

export const topComics = createAsyncThunk(
  "statistic/topComic",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await statisticAPI.topComics();
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const viewByMonth = createAsyncThunk(
  "statistic/viewByMonth",
  async (limit, { rejectWithValue }) => {
    try {
      const res = await statisticAPI.viewByMonth(limit);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getTotalView = createAsyncThunk(
  "statistic/getTotalView",
  async (limit, { rejectWithValue }) => {
    try {
      const res = await statisticAPI.getTotalView();
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
