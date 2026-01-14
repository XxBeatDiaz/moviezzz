import { createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../api/loginAPI";
import { addFavoriteMovie, removeFavoriteMovie } from "../../api/userAPI";

export const fetchUser = createAsyncThunk(
    "login/fetchUser",
    ({ username, password }) => login(username, password)
);

export const addUserFavoriteMovie = createAsyncThunk(
    "users/addUserFavoriteMovie",
    ({ userId, movieId }) => addFavoriteMovie(userId, movieId)
);

export const removeUserFavoriteMovie = createAsyncThunk(
    "users/removeUserFavoriteMovie",
    ({ userId, movieId }) => removeFavoriteMovie(userId, movieId)
);