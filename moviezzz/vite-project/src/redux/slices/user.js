import { createSlice, createSelector } from '@reduxjs/toolkit';

import { deleteFavoriteMovie, fetchUser, putFavoriteMovie } from '../thunks/userThunks';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: "idle",
        error: null,

        addFavStatus: "idle",
        removeFavStatus: "idle",
    },
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;

            state.addFavStatus = "idle";
            state.removeFavStatus = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(putFavoriteMovie.pending, (state) => {
                state.addFavStatus = 'loading';
            })
            .addCase(putFavoriteMovie.fulfilled, (state, action) => {
                state.addFavStatus = 'succeeded';
                state.user.moviesIds = action.payload;
            })
            .addCase(putFavoriteMovie.rejected, (state, action) => {
                state.addFavStatus = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteFavoriteMovie.pending, (state) => {
                state.removeFavStatus = 'loading';
            })
            .addCase(deleteFavoriteMovie.fulfilled, (state, action) => {
                state.removeFavStatus = 'succeeded';
                state.user.moviesIds = action.payload;
            })
            .addCase(deleteFavoriteMovie.rejected, (state, action) => {
                state.addFavStatus = 'failed';
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









