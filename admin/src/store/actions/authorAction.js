import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//retrive author datas

export const getAllAuthorInfo = createAsyncThunk(
  "author/info",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `http://server-pmhdt/api/authors`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
