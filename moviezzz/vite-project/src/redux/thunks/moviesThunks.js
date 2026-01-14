import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMovies, getMovieById, getMoviesByIds, getNewestMovies, getMoviesPage, getMoviesByFilters } from "../../api/moviesAPI.js";
import { AMOUNT_MOVIES_IN_PAGE } from "../../globals.js";

export const fetchMovies = createAsyncThunk("movies/fetchAll", getMovies);

export const fetchOneMovie = createAsyncThunk("movies/fetchOneMovie", getMovieById);

export const fetchManyMovies = createAsyncThunk(
    "movies/fetchManyMovies",
    (moviesIds) => getMoviesByIds(moviesIds)
);

export const fetchTheNewestMovies = createAsyncThunk(
    "movies/fetchTheNewestMovies",
    (amount) => getNewestMovies(amount)
);

export const fetchMoviesPage = createAsyncThunk(
    "movies/fetchMoviesPage",
    (_, { getState }) => {
        const state = getState();
        const { offset, limit } = state.movies;

        return getMoviesPage(offset, limit);
    }
);

export const fetchMoviesByFilters = createAsyncThunk(
    "movies/fetchByFilters",
    (filters = null, { getState }) => {
        const state = getState();

        const { offset, limit } = state.movies;
        const sourceFilters = filters ?? state.search.lastSearch;

        const {
            name = "",
            year = "",
            genre = "",
        } = sourceFilters;

        return getMoviesByFilters(name, year, genre, offset, limit);
    }
);

