import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { fetchGenres } from "../thunks/genresThunks"
import { STATUS_OPTIONS } from "../../globals.js";

const genresAdapter = createEntityAdapter();
const initialState = genresAdapter.getInitialState({
    status: STATUS_OPTIONS.IDLE,
    error: null,
});

const genresSlice = createSlice({
    name: "genres",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.status = STATUS_OPTIONS.LOADING;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.status = STATUS_OPTIONS.FAILED;
                state.error = action.error.message;
            })
    }
});

export const selectGenres = (state) => state.genres.genres;
export const selectGenresStatus = (state) => state.genres.status;
export const selectGenresError = (state) => state.genres.error;

export default genresSlice.reducer;
