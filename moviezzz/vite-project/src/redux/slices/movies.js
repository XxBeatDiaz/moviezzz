import { createSlice, createEntityAdapter, createSelector, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';

import { fetchMovies, fetchMoviesByFilters, fetchOneMovie, fetchManyMovies } from '../thunks/moviesThunks.js';
import { STATUS_OPTIONS } from '../../globals.js';

const moviesAdapter = createEntityAdapter();
const initialState = moviesAdapter.getInitialState({
    status: STATUS_OPTIONS.IDLE,
    error: null,
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addMatcher(
            isPending(fetchMovies, fetchOneMovie, fetchManyMovies, fetchMoviesByFilters),
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
        )

        builder.addMatcher(
            isFulfilled(fetchMovies, fetchManyMovies, fetchMoviesByFilters),
            (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;
                moviesAdapter.upsertMany(state, action.payload)
            }
        );

        builder.addMatcher(
            isRejected(fetchMovies, fetchOneMovie, fetchManyMovies, fetchMoviesByFilters),
            (state, action) => {
                state.status = STATUS_OPTIONS.FAILED;
                state.error = action.error.message;
            }
        );
    }
});

export const moviesSelectors = moviesAdapter.getSelectors(state => state.movies);

export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;

export const selectManyByIds = (ids) =>
    createSelector(
        [(state) => state.movies.entities],
        (entities) => ids.map(id => entities[id]).filter(Boolean)
    );

export default moviesSlice.reducer;