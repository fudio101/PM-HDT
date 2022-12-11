import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: null,
        userInfo: null,
        status: "idle",
    },
    reducers: {
        logout: (state, action) => {
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem("userToken_"); // deletes token from storage
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
                localStorage.setItem("userToken_", action.payload.access_token);
            })
            .addCase(signup.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "idle";
                state.userInfo = action.payload.user;
                state.token = action.payload.access_token;
                localStorage.setItem("userToken_", action.payload.access_token);
            })
            .addCase(getUserInfo.pending, (state, action) => {
                state.status = "loading";
                state.userInfo = null;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.status = "idle";
                state.userInfo = action.payload;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.status = "idle";
                localStorage.removeItem("userToken_"); // deletes token from storage
                state.userInfo = null;
                state.token = null;
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
        const { user } = getState();
        const token = user.token;
        const userInfo = user.userInfo;
        if (token) {
            if (!userInfo) {
                const res = await authApi.me(token);
                return res.data;
            }

            return userInfo;
        }
        return null;
    }
);

const { actions } = userSlice;

export const { logout } = actions;

export default userSlice;
