import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMovies, getMovieById, getMoviesByIds, getTheNewestMovies, getMoviesPage, getMoviesByFilters } from "../../api/moviesAPI.js";

export const fetchMovies = createAsyncThunk("movies/fetchAll", getMovies);

export const fetchOneMovie = createAsyncThunk("movies/fetchOneMovie", getMovieById);

export const fetchManyMovies = createAsyncThunk(
    "movies/fetchManyMovies",
    (moviesIds) => getMoviesByIds(moviesIds)
);

export const fetchTheNewestMovies = createAsyncThunk(
    "movies/fetchTheNewestMovies",
    (amount) => getTheNewestMovies(amount)
);

export const fetchPageOfMovies = createAsyncThunk(
    "movies/fetchPageMovies",
    ({ offset = 0, limit = 10 }) => getMoviesPage(offset, limit)
);

export const fetchMoviesByFilters = createAsyncThunk(
    "movies/fetchByFilters",
    ({ name = '', year = '', genre = '', offset = 0, limit = 10 }) => getMoviesByFilters(name, year, genre, offset, limit)
);

