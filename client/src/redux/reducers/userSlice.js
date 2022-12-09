import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

const token = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

const userSlice = createSlice({
    name: "user",
    initialState: {
        token,
        userInfor: null,
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "idle";
                state.token = action.payload.access_token;
                localStorage.setItem("userToken", action.payload.access_token);
            })
            .addCase(signup.pending, (state, action) => {
                state.status = "loading";
                state.data = [];
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "idle";
                state.userInfor = action.payload.user;
                state.token = action.payload.access_token;
                localStorage.setItem("userToken", action.payload.access_token);
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

const { actions } = userSlice;

export const {} = actions;

export default userSlice;
