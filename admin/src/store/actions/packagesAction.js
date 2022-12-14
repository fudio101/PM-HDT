import { createAsyncThunk } from "@reduxjs/toolkit";
import packagesAPI from "../../api/packagesAPI";

//get all packages
export const getAllPackage = createAsyncThunk(
  "package/getAllPackage",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await packagesAPI.getAll();
      return res.subscription_packages;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// get specify package
export const getPackage = createAsyncThunk(
  "package/getPackage",
  async (id, { rejectWithValue }) => {
    try {
      const res = await packagesAPI.get(id);
      return res.subscription_packages;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// delete package

export const delPackage = createAsyncThunk(
  "package/delPackage",
  async (id, { rejectWithValue }) => {
    try {
      const res = await packagesAPI.delete(id);
      return res;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// update package

export const updatePackage = createAsyncThunk(
  "package/updatePackage",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload);
      const { id, subscription_packages } = payload;
      // console.log(id, author);
      const res = await packagesAPI.update(id, subscription_packages);
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

// new package

export const newPackage = createAsyncThunk(
  "package/newPackage",
  async (payload, { rejectWithValue }) => {
    try {
      const { subscription_packages } = payload;

      const res = await packagesAPI.store(subscription_packages);
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
