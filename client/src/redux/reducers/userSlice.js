import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

const token = localStorage.getItem("_userToken")
  ? localStorage.getItem("_userToken")
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    token,
    userInfo: null,
    status: "idle",
  },
  reducers: {
    logout: (state, action) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("_userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.access_token;
        localStorage.setItem("_userToken", action.payload.access_token);
      })
      .addCase(signup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem("_userToken", action.payload.access_token);
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "idle";
        state.userInfo = null;
      });
  },
});

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkApi) => {
    const res = await authApi.login(email, password);
    return res.data;
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async ({ name, email, password, passwordConfirmation }, thunkApi) => {
    const res = await authApi.signup(
      name,
      email,
      password,
      passwordConfirmation
    );
    return res.data;
  }
);

export const getUserInfo = createAsyncThunk(
  "user/info",
  async (input, { getState }) => {
    const res = await authApi.me();
    return res.data;
  }
);

const { actions } = userSlice;

export const { logout } = actions;

export default userSlice;
