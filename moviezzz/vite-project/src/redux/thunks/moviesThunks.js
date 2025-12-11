import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMovieById, getMoviesByIds, getMovies, getMoviesByFilters, getMoviesPage, getLenOfMovies } from "../../api/moviesAPI.js";

export const fetchMovies = createAsyncThunk("movies/fetchAll", getMovies);

export const fetchLenOfMovies = createAsyncThunk("movies/fetchLenOfMovies", getLenOfMovies);

export const fetchOneMovie = createAsyncThunk("movies/fetchOneMovie", getMovieById);

export const fetchManyMovies = createAsyncThunk("movies/fetchManyMovies", getMoviesByIds);

export const fetchPageOfMovies = createAsyncThunk(
    "movies/fetchPageMovies",
    (pageNum) => getMoviesPage(pageNum)
);

export const fetchMoviesByFilters = createAsyncThunk(
    "movies/fetchByFilters",
    ({ name = '', year = '', genre = '', pageNum }) => getMoviesByFilters(name, year, genre, pageNum)
    
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
