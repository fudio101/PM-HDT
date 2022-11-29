import { createSelector } from "@reduxjs/toolkit";

export const categoryListSelector = (state) => state.categories.data;

export const countryListSelector = (state) => state.countries.data;

export const latestComicsSelector = (state) => state.latestComics.data;

const searchComicsFilterDataSelector = (state) => state.searchComics.data;
const searchComicsFilterCategorySelector = (state) =>
    state.searchComics.filters.category;
const searchComicsFilterStatusSelector = (state) =>
    state.searchComics.filters.status;
const searchComicsFilterCountrySelector = (state) =>
    state.searchComics.filters.country;
export const searchComicsFilterResultSelector = createSelector(
    searchComicsFilterDataSelector,
    searchComicsFilterCategorySelector,
    searchComicsFilterStatusSelector,
    searchComicsFilterCountrySelector,
    (data, category, status, country) =>
        data?.filter(
            (comic, index) =>
                (category === 0 ||
                    comic.categories.some((cate) => cate.id === category)) &&
                (status === -1 || comic.status === status) &&
                (country === 0 || comic.country.id === country)
        )
);

const latestComicsFilterDataSelector = (state) => state.latestComics.data;
const latestComicsFilterCategorySelector = (state) =>
    state.latestComics.filters.category;
const latestComicsFilterStatusSelector = (state) =>
    state.latestComics.filters.status;
const latestComicsFilterCountrySelector = (state) =>
    state.latestComics.filters.country;
export const latestComicsFilterResultSelector = createSelector(
    latestComicsFilterDataSelector,
    latestComicsFilterCategorySelector,
    latestComicsFilterStatusSelector,
    latestComicsFilterCountrySelector,
    (data, category, status, country) =>
        data?.filter(
            (comic, index) =>
                (category === 0 ||
                    comic.categories.some((cate) => cate.id === category)) &&
                (status === -1 || comic.status === status) &&
                (country === 0 || comic.country.id === country)
        )
);

const categoryComicsFilterDataSelector = (state) => state.categoryComics.data;
const categoryComicsFilterStatusSelector = (state) =>
    state.categoryComics.filters.status;
const categoryComicsFilterCountrySelector = (state) =>
    state.categoryComics.filters.country;
export const categoryComicsFilterResultSelector = createSelector(
    categoryComicsFilterDataSelector,
    categoryComicsFilterStatusSelector,
    categoryComicsFilterCountrySelector,
    (data, status, country) =>
        data?.filter(
            (comic, index) =>
                (status === -1 || comic.status === status) &&
                (country === 0 || comic.country.id === country)
        )
);

export const chapterImagesSelector = (state) => state.chapter.data?.image_urls;
export const previousChapterSelector = (state) => state.chapter.previousChapter;
export const nextChapterSelector = (state) => state.chapter.nextChapter;
export const chapterListSelector = (state) =>
    state.chapter.data?.list_of_episode_number
        ? [...state.chapter.data?.list_of_episode_number].reverse()
        : [];

const categoriesSliceStatusSelector = (state) => state.categories.status;
const categoryComicsSliceStatusSelector = (state) =>
    state.categoryComics.status;
const chapterSliceStatusSelector = (state) => state.chapter.status;
const countriesSliceStatusSelector = (state) => state.countries.status;
const latestComicsSliceStatusSelector = (state) => state.latestComics.status;
const searchComicsSliceStatusSelector = (state) => state.searchComics.status;

export const isLoadingSelector = createSelector(
    categoriesSliceStatusSelector,
    categoryComicsSliceStatusSelector,
    chapterSliceStatusSelector,
    countriesSliceStatusSelector,
    latestComicsSliceStatusSelector,
    searchComicsSliceStatusSelector,
    (
        categories,
        categoryComics,
        chapter,
        countries,
        latestComics,
        searchComics
    ) =>
        [
            categories,
            categoryComics,
            chapter,
            countries,
            latestComics,
            searchComics,
        ].includes("loading")
);

export const readComicSelector = (comicSlug) => (state) =>
    state.readComicList.data.find((item) => item.slug === comicSlug)?.chapter;
