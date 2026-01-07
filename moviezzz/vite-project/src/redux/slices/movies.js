import { createSlice, createEntityAdapter, createSelector, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';

import { fetchMovies, fetchMoviesByFilters, fetchOneMovie, fetchManyMovies, fetchMoviesPage, fetchTheNewestMovies } from '../thunks/moviesThunks.js';
import { AMOUNT_MOVIES_IN_PAGE, STATUS_OPTIONS } from '../../globals.js';

const moviesAdapter = createEntityAdapter();
const initialState = moviesAdapter.getInitialState({
    status: STATUS_OPTIONS.IDLE,
    error: null,

    total: 0,
    page: 1,
    offset: 0,
    limit: AMOUNT_MOVIES_IN_PAGE,

    newestMovies: [],
    favoritesMovies: [],
    favoritesMoviesStatus: STATUS_OPTIONS.IDLE,
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
            state.offset = 0;
        },

        nextPage(state) {
            state.page += 1;
            state.offset = (state.page - 1) * state.limit;
        },

        prevPage(state) {
            if (state.page > 1) {
                state.page -= 1;
            }
        },

        removeFavoritesMovies(state) {
            state.favoritesMovies = [];
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            isPending(fetchMovies, fetchOneMovie, fetchMoviesByFilters, fetchMoviesPage, fetchTheNewestMovies),
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
            isFulfilled(fetchMoviesPage, fetchMoviesByFilters),
            (state, action) => {
                const { movies, total } = action.payload

                state.status = STATUS_OPTIONS.SUCCEEDED;
                state.total = total;

                moviesAdapter.upsertMany(state, movies);
            }
        );

        builder.addMatcher(
            isFulfilled(fetchMovies),
            (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;

                moviesAdapter.upsertMany(state, action.payload);
            }
        );

        builder.addMatcher(
            isFulfilled(fetchManyMovies),
            (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;
                state.favoritesMovies = action.payload;
            }
        );

        builder.addMatcher(
            isRejected(fetchMovies, fetchOneMovie, fetchMoviesByFilters, fetchMoviesPage, fetchTheNewestMovies),
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
export const selectFavoritesMovies = (state) => state.movies.favoritesMovies
export const selectFavoritesMoviesStatus = (state) => state.movies.favoritesMoviesStatus

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
        (state) => state.movies.limit,
        (state) => state.movies.offset
    ],
    (movies, page, total, limit, offset) => {
        const moviesInStore = movies.length;

        return {
            page,
            total,
            limit,
            offset,
            moviesInStore,
            hasMore: moviesInStore < total,
            totalPage: Math.ceil(total / limit),
        };
    }
);

export const {
    resetMovies,
    nextPage,
    prevPage,
    removeFavoritesMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;