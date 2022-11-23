import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import comicApi from "../../api/comicApi";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        values: {
            category: 0,
            status: -1,
            nation: 0,
        },
        data: [],
        status: "idle",
    },
    reducers: {
        categoryFilterChange: (state, action) => {
            state.values.category = parseInt(action.payload);
        },
        statusFilterChange: (state, action) => {
            state.values.status = action.payload;
        },
        nationFilterChange: (state, action) => {
            state.values.nation = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchComics.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(searchComics.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload;
            });
    },
});

export const searchComics = createAsyncThunk(
    "filters/search",
    async (searchKey, thunkApi) => {
        const { data } = await comicApi.search(searchKey);
        return data.data;
    }
);

const { actions } = filtersSlice;

export const {
    categoryFilterChange,
    statusFilterChange,
    nationFilterChange,
    setData,
} = actions;

export default filtersSlice;
