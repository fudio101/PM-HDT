import { createSelector } from "@reduxjs/toolkit";

export const categoryListSelector = (state) => state.categories.data;

export const latestComicsSelector = (state) => state.latestComics.data;

const searchComicsFilterDataSelector = (state) => state.searchComics.data;
const searchComicsFilterCategorySelector = (state) =>
    state.searchComics.filters.category;
const searchComicsFilterStatusSelector = (state) =>
    state.searchComics.filters.status;
const searchComicsFilterNationSelector = (state) =>
    state.searchComics.filters.nation;
export const searchComicsFilterResultSelector = createSelector(
    searchComicsFilterDataSelector,
    searchComicsFilterCategorySelector,
    searchComicsFilterStatusSelector,
    searchComicsFilterNationSelector,
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

const latestComicsFilterDataSelector = (state) => state.latestComics.data;
const latestComicsFilterCategorySelector = (state) =>
    state.latestComics.filters.category;
const latestComicsFilterStatusSelector = (state) =>
    state.latestComics.filters.status;
const latestComicsFilterNationSelector = (state) =>
    state.latestComics.filters.nation;
export const latestComicsFilterResultSelector = createSelector(
    latestComicsFilterDataSelector,
    latestComicsFilterCategorySelector,
    latestComicsFilterStatusSelector,
    latestComicsFilterNationSelector,
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
