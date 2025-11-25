import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMovieById, getMoviesByIds, getMovies, getMoviesByFilters } from "../../api/moviesAPI.js";

export const fetchMovies = createAsyncThunk(
    "movies/fetchAll",
    async () => {
        const movies = await getMovies();
        return movies;
    }
);

export const fetchOneMovie = createAsyncThunk(
    "movies/fetchOneMovie",
    async ({ movieId }) => {
        const movie = await getMovieById(movieId);
        return movie;
    }
)

export const fetchManyMovies = createAsyncThunk(
    "movies/fetchManyMovies",
    async (moviesIds) => {
        const movies = await getMoviesByIds(moviesIds);
        return movies;
    }
)

export const fetchMoviesByFilters = createAsyncThunk(
    "movies/fetchByFilters",
    async ({ name = '', year = '', genre = '' }) => {        
        const movies = await getMoviesByFilters(name, year, genre);
        return movies;
    }
);

export const fetchMoviesByName = createAsyncThunk(
    "movies/fetchByName",
    async (name) => {
        const movies = await getMoviesByFilters(name);
        return movies;
    }
);

export const fetchMoviesByYear = createAsyncThunk(
    "movies/fetchByYear",
    async (year) => {
        const movies = await getMoviesByFilters("", year);
        return movies;
    }
);

export const fetchMoviesByGenres = createAsyncThunk(
    "movies/fetchByGenres",
    async (genres) => {
        const movies = await getMoviesByFilters("", "", genres);
        return movies;
    }
);
