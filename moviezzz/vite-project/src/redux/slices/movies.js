import { createSlice, createEntityAdapter, createSelector, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';

import { fetchMovies, fetchMoviesByFilters, fetchOneMovie, fetchManyMovies, fetchPageOfMovies, fetchLenOfMovies } from '../thunks/moviesThunks.js';
import { STATUS_OPTIONS } from '../../globals.js';

const moviesAdapter = createEntityAdapter();
const initialState = moviesAdapter.getInitialState({
    status: STATUS_OPTIONS.IDLE,
    error: null,

    lenOfAllMovies: 0,

    page: [],
    lenOfNextPage: 0,
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addMatcher(
            isFulfilled(fetchLenOfMovies),
            (state, action) => {
                state.lenOfAllMovies = action.payload;
            }
        );

        builder.addMatcher(
            isPending(fetchMovies, fetchOneMovie, fetchManyMovies, fetchMoviesByFilters, fetchPageOfMovies),
            (state) => {
                state.status = STATUS_OPTIONS.LOADING;
                state.error = null;
            }
        );

        builder.addMatcher(
            isFulfilled(fetchOneMovie),
            (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;

                moviesAdapter.upsertOne(state, action.payload);
            }
        );

        builder.addMatcher(
            isFulfilled(fetchPageOfMovies, fetchMoviesByFilters),
            (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;
                state.page = action.payload.movies;

                state.lenOfNextPage = action.payload.lenOfNextPage;

                moviesAdapter.upsertMany(state, action.payload.movies);
            }
        );


        builder.addMatcher(
            isFulfilled(fetchMovies, fetchManyMovies),
            (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;

                moviesAdapter.upsertMany(state, action.payload)
            }
        );

        builder.addMatcher(
            isRejected(fetchMovies, fetchOneMovie, fetchManyMovies, fetchMoviesByFilters, fetchPageOfMovies),
            (state, action) => {
                state.status = STATUS_OPTIONS.FAILED;
                state.error = action.error.message;
            }
        );
    }
});

export const moviesSelectors = moviesAdapter.getSelectors(state => state.movies);
export const selectLenOfAllMovies = (state) => state.movies.lenOfAllMovies;

export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;

export const selectPage = (state) => state.movies.page;
export const selectLenOfPage = (state) => state.movies.page.length;
export const selectLenOfNextPage = (state) => state.movies.lenOfNextPage;

export const selectMovieById = (id) => (state) => moviesSelectors.selectById(state, id);

export const selectManyByIds = (moviesIds) =>
    createSelector(
        [moviesSelectors.selectAll],
        (movies) => movies.filter(movie => moviesIds.includes(movie.id))
    );

export const selectTheNewestMovies = (amount) =>
    createSelector(
        [moviesSelectors.selectAll],
        (movies) => {
            const sortedMovies = [...movies].sort((a, b) => new Date(b.year) - new Date(a.year));
            return sortedMovies.slice(0, amount);
        }
    );

export default moviesSlice.reducer;