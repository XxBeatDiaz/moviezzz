import { createSlice, createSelector } from '@reduxjs/toolkit';

import { fetchUser, removeUserFavoriteMovie, addUserFavoriteMovie } from '../thunks/userThunks';
import { STATUS_OPTIONS } from '../../globals.js';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: STATUS_OPTIONS.IDLE,
        error: null,

        addFavStatus: STATUS_OPTIONS.IDLE,
        removeFavStatus: STATUS_OPTIONS.IDLE,
    },
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.status = STATUS_OPTIONS.IDLE;
            state.error = null;

            state.addFavStatus = STATUS_OPTIONS.IDLE;
            state.removeFavStatus = STATUS_OPTIONS.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = STATUS_OPTIONS.LOADING;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = STATUS_OPTIONS.SUCCEEDED;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = STATUS_OPTIONS.FAILED;
                state.error = action.error.message;
            })

            .addCase(addUserFavoriteMovie.pending, (state) => {
                state.addFavStatus = STATUS_OPTIONS.LOADING;
            })
            .addCase(addUserFavoriteMovie.fulfilled, (state, action) => {
                state.addFavStatus = STATUS_OPTIONS.SUCCEEDED;
                state.user.moviesIds = action.payload;
            })
            .addCase(addUserFavoriteMovie.rejected, (state, action) => {
                state.addFavStatus = STATUS_OPTIONS.FAILED;
                state.error = action.error.message;
            })

            .addCase(removeUserFavoriteMovie.pending, (state) => {
                state.removeFavStatus = STATUS_OPTIONS.LOADING;
            })
            .addCase(removeUserFavoriteMovie.fulfilled, (state, action) => {
                state.removeFavStatus = STATUS_OPTIONS.SUCCEEDED;
                state.user.moviesIds = action.payload;
            })
            .addCase(removeUserFavoriteMovie.rejected, (state, action) => {
                state.removeFavStatus = STATUS_OPTIONS.FAILED;
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









