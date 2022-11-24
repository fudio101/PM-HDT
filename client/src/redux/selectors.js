import { createSelector } from "@reduxjs/toolkit";

export const categoryListSelector = (state) => state.categories.data;
export const filterCategorySelector = (state) => state.filters.values.category;
export const filterStatusSelector = (state) => state.filters.values.status;
export const filterNationSelector = (state) => state.filters.values.nation;
export const filterDataSelector = (state) => state.filters.data;
export const latestComicsSelector = (state) => state.latestComics.data;

export const filterResultSelector = createSelector(
    filterDataSelector,
    filterCategorySelector,
    filterStatusSelector,
    filterNationSelector,
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
