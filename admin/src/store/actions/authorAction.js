import { createAsyncThunk } from "@reduxjs/toolkit";
import authorAPI from "../../api/authorAPI";

//THUNK

export const getAllAuthor = createAsyncThunk(
  "author/getAllAuthor",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await authorAPI.getAll();
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

// get specify author

export const getAuthor = createAsyncThunk(
  "author/getAuthor",
  async (id, { rejectWithValue }) => {
    try {
      const res = await authorAPI.get(id);
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

// delete author

export const delAuthor = createAsyncThunk(
  "author/deleteAuthor",
  async (id, { rejectWithValue }) => {
    try {
      const res = await authorAPI.delete(id);
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

// update author

export const update = createAsyncThunk(
  "author/updateAuthor",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload);
      const { id, author } = payload;
      // console.log(id, author);
      const res = await authorAPI.update(id, author);
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

// new author

export const newAuthor = createAsyncThunk(
  "author/newAuthor",
  async (payload, { rejectWithValue }) => {
    try {
      const { author } = payload;

      const res = await authorAPI.store(author);
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
