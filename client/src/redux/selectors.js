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
export const searchComicsFilterItemsPerPageSelector = (state) =>
    state.searchComics.filters.itemsPerPage;
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
export const latestComicsFilterItemsPerPageSelector = (state) =>
    state.latestComics.filters.itemsPerPage;

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

const comicRankingsFilterDataSelector = (state) => state.comicRankings.data;
const comicRankingsFilterCategorySelector = (state) =>
    state.comicRankings.filters.category;
const comicRankingsFilterStatusSelector = (state) =>
    state.comicRankings.filters.status;
const comicRankingsFilterCountrySelector = (state) =>
    state.comicRankings.filters.country;

export const comicRankingsFilterResultSelector = createSelector(
    comicRankingsFilterDataSelector,
    comicRankingsFilterCategorySelector,
    comicRankingsFilterStatusSelector,
    comicRankingsFilterCountrySelector,
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
export const categoryComicsFilterItemsPerPageSelector = (state) =>
    state.categoryComics.filters.itemsPerPage;
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
export const viewInforSelector = (state) => state.chapter.viewInfor;
export const previousChapterSelector = (state) => state.chapter.previousChapter;
export const nextChapterSelector = (state) => state.chapter.nextChapter;
export const chapterListSelector = (state) =>
    state.chapter.data?.list_of_episode_number
        ? [...state.chapter.data?.list_of_episode_number].reverse()
        : [];
export const isAcceptedViewSelector = (state) => state.chapter.acceptedView;

const categoriesSliceStatusSelector = (state) => state.categories.status;
const categoryComicsSliceStatusSelector = (state) =>
    state.categoryComics.status;
const chapterSliceStatusSelector = (state) => state.chapter.status;
const countriesSliceStatusSelector = (state) => state.countries.status;
const latestComicsSliceStatusSelector = (state) => state.latestComics.status;
const searchComicsSliceStatusSelector = (state) => state.searchComics.status;
const comicRankingsSliceStatusSelector = (state) => state.comicRankings.status;

export const isLoadingSelector = createSelector(
    categoriesSliceStatusSelector,
    categoryComicsSliceStatusSelector,
    chapterSliceStatusSelector,
    countriesSliceStatusSelector,
    latestComicsSliceStatusSelector,
    searchComicsSliceStatusSelector,
    comicRankingsSliceStatusSelector,
    (
        categories,
        categoryComics,
        chapter,
        countries,
        latestComics,
        searchComics,
        comicRankings
    ) =>
        [
            categories,
            categoryComics,
            chapter,
            countries,
            latestComics,
            searchComics,
            comicRankings,
        ].includes("loading")
);

export const readComicSelector = (comicSlug) => (state) =>
    state.readComicList.data.find((item) => item.slug === comicSlug)?.chapter;

export const userSliceInfoSelector = (state) => state.user.userInfo;
export const userSliceStatusSelector = (state) => state.user.status;
export const userSliceTokenSelector = (state) => state.user.token;
export const isMainLoadingSelector = createSelector(
    (state) => state.user.status,
    (status) => status === "loading"
);

export const subscriptionsSliceDataSelector = (state) =>
    state.subscriptions.data;
export const subscriptionsSlicevndToUsdRateSelector = (state) =>
    state.subscriptions.vndToUsdRate;
