import { createSlice, createEntityAdapter, createSelector, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';

import { fetchMovies, fetchMoviesByFilters, fetchOneMovie, fetchManyMovies } from '../thunks/moviesThunks.js';

const moviesAdapter = createEntityAdapter();
const initialState = moviesAdapter.getInitialState({
    status: 'idle',
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
                state.status = 'loading';
                state.error = null;
            }
        );

        builder.addMatcher(
            isFulfilled(fetchOneMovie),
            (state, action) => {
                state.status = "succeeded";
                moviesAdapter.upsertOne(state, action.payload);
            }
        )

        builder.addMatcher(
            isFulfilled(fetchMovies, fetchManyMovies, fetchMoviesByFilters),
            (state, action) => {
                state.status = 'succeeded';
                moviesAdapter.upsertMany(state, action.payload)
            }
        );

        builder.addMatcher(
            isRejected(fetchMovies, fetchOneMovie, fetchManyMovies, fetchMoviesByFilters),
            (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }
        );


    }
});

export const moviesSelectors = moviesAdapter.getSelectors(state => state.movies);

export const selectMoviesStatus = (state) => state.genres.status;
export const selectMoviesError = (state) => state.genres.error;

export const selectManyByIds = (ids) =>
    createSelector(
        [(state) => state.movies.entities],
        (entities) => ids.map(id => entities[id]).filter(Boolean)
    );

export default moviesSlice.reducer;