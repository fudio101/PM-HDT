import { createSelector } from "@reduxjs/toolkit";

export const categoryListSelector = (state) => state.categories.data;

export const latestComicsSelector = (state) => state.latestComics.data;

const searchFilterCategorySelector = (state) =>
    state.searchComics.values.category;
const searchFilterStatusSelector = (state) => state.searchComics.values.status;
const searchFilterNationSelector = (state) => state.searchComics.values.nation;
const searchFilterDataSelector = (state) => state.searchComics.data;
export const searchFilterResultSelector = createSelector(
    searchFilterDataSelector,
    searchFilterCategorySelector,
    searchFilterStatusSelector,
    searchFilterNationSelector,
    (data, category, status, nation) => {
        return data.filter((comic, index) => {
            return (
                (category === 0 ||
                    comic.categories.some((cate) => cate.id === category)) &&
                (status === -1 || comic.status === status)
            );
        });
    }
);
