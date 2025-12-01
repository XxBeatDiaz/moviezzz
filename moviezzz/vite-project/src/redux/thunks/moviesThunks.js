import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMovieById, getMoviesByIds, getMovies, getMoviesByFilters } from "../../api/moviesAPI.js";

export const fetchMovies = createAsyncThunk(
    "movies/fetchAll",
    getMovies
);

export const fetchOneMovie = createAsyncThunk(
    "movies/fetchOneMovie",
    getMovieById
)

export const fetchManyMovies = createAsyncThunk(
    "movies/fetchManyMovies",
    getMoviesByIds
)

export const fetchMoviesByFilters = createAsyncThunk(
    "movies/fetchByFilters",
    ({ name = '', year = '', genre = '' }) => getMoviesByFilters(name, year, genre)
);

export const fetchMoviesByName = createAsyncThunk(
    "movies/fetchByName",
    (name) => getMoviesByFilters(name)
);

export const fetchMoviesByYear = createAsyncThunk(
    "movies/fetchByYear",
    (year) => getMoviesByFilters("", year)
);

export const fetchMoviesByGenres = createAsyncThunk(
    "movies/fetchByGenres",
    (genres) => getMoviesByFilters("", "", genres)
);
