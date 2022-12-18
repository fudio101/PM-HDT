import { createAsyncThunk } from "@reduxjs/toolkit";
import receiptAPI from "../../api/receiptAPI";

//THUNK

//get all receipt
export const getAllReceipt = createAsyncThunk(
  "receipt/getAllReceipt",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await receiptAPI.getAll();
      return res.bills;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// get specify receipt

export const getReceipt = createAsyncThunk(
  "receipt/getReceipt",
  async (id, { rejectWithValue }) => {
    try {
      const res = await receiptAPI.get(id);
      return res.bill;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
