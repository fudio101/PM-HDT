import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import userAPI from "../../api/userAPI";

//THUNK

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const res = await userAPI.login({ email, password });
      // const { data } = await axios.post(
      //   "http://server-pmhdt/api/auth/login",
      //   { email, password },
      //   config
      // );

      localStorage.setItem("userToken", res.access_token);
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

// get userInfo

export const getUserInfo = createAsyncThunk(
  "user/info",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await userAPI.me();
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

//userLogout

export const logout = createAsyncThunk(
  "user/logout",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.logout();
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

//new user form admin page action

export const newUser = createAsyncThunk(
  "user/newUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await userAPI.store(user);
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

// update user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      const res = await userAPI.update(id, user);
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

// delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await userAPI.delete(id);
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

export const getAllUsers = createAsyncThunk(
  "user/getAllUser",
  async (arg, { rejectWithValue }) => {
    try {
      const data = await userAPI.getAll();
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//change Password

export const chanegPassword = createAsyncThunk(
  "user/chanegPassword",
  async (password, { rejectWithValue }) => {
    try {
      const data = await userAPI.changePassword(password);
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//forgot password

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const data = await userAPI.forgotPassword(email);
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
