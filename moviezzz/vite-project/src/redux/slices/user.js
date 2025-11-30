import { createSlice, createSelector } from '@reduxjs/toolkit';

import { deleteFavoriteMovie, fetchUser, putFavoriteMovie } from '../thunks/userThunks';
import { statusOptions } from '../../globals.js';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: statusOptions.idle,
        error: null,

        addFavStatus: statusOptions.idle,
        removeFavStatus: statusOptions.idle,
    },
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.status = statusOptions.idle;
            state.error = null;

            state.addFavStatus = statusOptions.idle;
            state.removeFavStatus = statusOptions.idle;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = statusOptions.loading;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = statusOptions.succeeded;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = statusOptions.failed;
                state.error = action.error.message;
            })

            .addCase(putFavoriteMovie.pending, (state) => {
                state.addFavStatus = statusOptions.loading;
            })
            .addCase(putFavoriteMovie.fulfilled, (state, action) => {
                state.addFavStatus = statusOptions.succeeded;
                state.user.moviesIds = action.payload;
            })
            .addCase(putFavoriteMovie.rejected, (state, action) => {
                state.addFavStatus = statusOptions.failed;
                state.error = action.error.message;
            })

            .addCase(deleteFavoriteMovie.pending, (state) => {
                state.removeFavStatus = statusOptions.loading;
            })
            .addCase(deleteFavoriteMovie.fulfilled, (state, action) => {
                state.removeFavStatus = statusOptions.succeeded;
                state.user.moviesIds = action.payload;
            })
            .addCase(deleteFavoriteMovie.rejected, (state, action) => {
                state.removeFavStatus = statusOptions.failed;
                state.error = action.error.message;
            })
    }
});

export const selectUser = (state) => state.user.user;
export const selectUserId = (state) => state.user.user.id;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export const selectMoviesIdsFromUser = createSelector(
    [selectUser],
    (user) => {
        if (!user) return [];

        return user.moviesIds;
    }
);

export const { logOut } = userSlice.actions;
export default userSlice.reducer;









