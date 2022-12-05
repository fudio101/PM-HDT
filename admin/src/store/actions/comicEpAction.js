import { createAsyncThunk } from "@reduxjs/toolkit";
import comicEpAPI from "../../api/comicEpAPI";

export const getComicEpByID = createAsyncThunk(
  "comic/getComicEpByID",
  async (id, { rejectWithValue }) => {
    try {
      const res = await comicEpAPI.getComicEp(id);
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

//new chapter
export const newChapter = createAsyncThunk(
  "comic/newChapter",
  async (payload, { rejectWithValue }) => {
    try {
      const { photos } = payload;

      const res = await comicEpAPI.newChapter(photos);
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

//update

export const updateComicEP = createAsyncThunk(
  "comic/updateComicEP",
  async (payload, { rejectWithValue }) => {
    const { id, photos } = payload;
    try {
      const res = await comicEpAPI.updateComicEP(id, photos);
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

// delete comic episode

export const deleteComicEP = createAsyncThunk(
  "comic/deleteComicEP",
  async (id, { rejectWithValue }) => {
    try {
      const res = await comicEpAPI.deleteComiCEP(id);
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

// get All Comic Ep

export const getAllComicEP = createAsyncThunk(
  "comic/getAllComicEP",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await comicEpAPI.getComicAllEp();
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
