import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { fetchGenres } from "../thunks/genresThunks"
import { statusOptions } from "../../globals.js";

const genresAdapter = createEntityAdapter();
const initialState = genresAdapter.getInitialState({
    status: statusOptions.idle,
    error: null,
});

const genresSlice = createSlice({
    name: "genres",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.status = statusOptions.loading;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.status = statusOptions.succeeded;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.status = statusOptions.failed;
                state.error = action.error.message;
            })
    }
});

export const selectGenres = (state) => state.genres.genres;
export const selectGenresStatus = (state) => state.genres.status;
export const selectGenresError = (state) => state.genres.error;

export default genresSlice.reducer;
