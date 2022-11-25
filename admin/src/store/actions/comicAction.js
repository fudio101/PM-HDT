import { createAsyncThunk } from "@reduxjs/toolkit";
import comicAPI from "../../api/comicAPI";

//THUNK

export const getAllComic = createAsyncThunk(
  "comic/getAllComic",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await comicAPI.getAll();
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

// get specify comic

export const getComic = createAsyncThunk(
  "comic/getComic",
  async (id, { rejectWithValue }) => {
    try {
      const res = await comicAPI.get(id);
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

// delete comic

export const delComic = createAsyncThunk(
  "comic/deleteComic",
  async (id, { rejectWithValue }) => {
    try {
      const res = await comicAPI.delete(id);
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

//

// update comic

export const update = createAsyncThunk(
  "comic/updateComic",
  async (payload, { rejectWithValue }) => {
    const { id, comic } = payload;
    try {
      const res = await comicAPI.update(id, comic);
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

// new comic

export const newComic = createAsyncThunk(
  "comic/newComic",
  async (payload, { rejectWithValue }) => {
    try {
      const { comic } = payload;

      const res = await comicAPI.store(comic);
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

export const newChapter = createAsyncThunk(
  "comic/newChapter",
  async (payload, { rejectWithValue }) => {
    try {
      const { photos } = payload;

      const res = await comicAPI.newChapter(photos);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
