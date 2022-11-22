import { createSelector } from "@reduxjs/toolkit";

export const categoryListSelector = (state) => state.categories.data;
