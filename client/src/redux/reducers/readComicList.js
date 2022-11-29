import { createSlice } from "@reduxjs/toolkit";

const readComicListSlice = createSlice({
    name: "readComicList",
    initialState: {
        data: [],
    },
    reducers: {
        addReadComic: (state, action) => {
            const oldState = JSON.parse(JSON.stringify(state));
            let index = oldState.data.findIndex(
                (item) => item.slug === action.payload.slug
            );

            console.log("SE", index);

            if (index >= 0) {
                if (state.data[index].chapter < action.payload.chapter) {
                    state.data[index].chapter = action.payload.chapter;
                }
            } else {
                state.data.push({
                    slug: action.payload.slug,
                    chapter: action.payload.chapter,
                });
            }
        },
    },
});

const { actions } = readComicListSlice;

export const { addReadComic } = actions;

export default readComicListSlice;
