import { createSlice, createEntityAdapter, createSelector, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';

import { fetchMovies, fetchMoviesByFilters, fetchOneMovie, fetchManyMovies, fetchPageOfMovies, fetchTheNewestMovies } from '../thunks/moviesThunks.js';
import { AMOUNT_MOVIES_IN_PAGE, STATUS_OPTIONS } from '../../globals.js';

const moviesAdapter = createEntityAdapter();
const initialState = moviesAdapter.getInitialState({
    status: STATUS_OPTIONS.IDLE,
    error: null,

    total: 0,
    page: 1,
    limit: AMOUNT_MOVIES_IN_PAGE,

    newestMovies: [],
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        resetMovies(state) {
            moviesAdapter.removeAll(state);
            state.status = STATUS_OPTIONS.IDLE;
            state.error = null;

            state.total = 0;
            state.page = 1;
        },

        nextPage(state) {
            state.page += 1;
        },

        prevPage(state) {
            state.page -= 1;
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            isPending(fetchMovies, fetchOneMovie, fetchManyMovies, fetchMoviesByFilters, fetchPageOfMovies, fetchTheNewestMovies),
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
            isFulfilled(fetchTheNewestMovies),
            (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;
                state.newestMovies = action.payload;
            }
        );

        builder.addMatcher(
            isFulfilled(fetchPageOfMovies, fetchMoviesByFilters),
            (state, action) => {
                const { movies, total } = action.payload

                state.status = STATUS_OPTIONS.SUCCEEDED;
                state.total = total;

                moviesAdapter.upsertMany(state, movies);
            }
        );

        builder.addMatcher(
            isFulfilled(fetchMovies, fetchManyMovies),
            (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;
                state.total = action.payload.length;

                moviesAdapter.upsertMany(state, action.payload)
            }
        );

        builder.addMatcher(
            isRejected(fetchMovies, fetchOneMovie, fetchManyMovies, fetchMoviesByFilters, fetchPageOfMovies, fetchTheNewestMovies),
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

export const selectTheNewestMovies = (state) => state.movies.newestMovies
export const selectMovieById = (id) => (state) => moviesSelectors.selectById(state, id);

export const selectManyByIds = (moviesIds) =>
    createSelector(
        [moviesSelectors.selectAll],
        (movies) => movies.filter(movie => moviesIds.includes(movie.id))
    );

export const selectMoviesForCurrentPage = createSelector(
    [
        moviesSelectors.selectAll,
        (state) => state.movies.page,
        (state) => state.movies.limit,
    ],
    (movies, page, limit) =>
        movies.slice((page - 1) * limit, page * limit)
);

export const selectMoviesPaging = createSelector(
    [
        moviesSelectors.selectAll,
        (state) => state.movies.page,
        (state) => state.movies.total,
    ],
    (movies, page, total) => {
        const moviesInStore = movies.length;

        return {
            page,
            total,
            moviesInStore,
            hasMore: moviesInStore < total,
            totalPage: Math.ceil(total / AMOUNT_MOVIES_IN_PAGE),
        };
    }
);

export const {
    resetMovies,
    nextPage,
    prevPage,
} = moviesSlice.actions;
export default moviesSlice.reducer;