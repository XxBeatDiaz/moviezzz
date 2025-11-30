import { createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../api/loginAPI";
import { addFavoriteMovie, removeFavoriteMovie } from "../../api/userAPI";

export const fetchUser = createAsyncThunk(
    "login/fetchUser",
    async ({ username, password }) => {
        const response = await login(username, password);
        return response;
    }
);

export const addUserFavoriteMovie = createAsyncThunk(
    "users/addUserFavoriteMovie",
    async ({ userId, movieId }) => {
        const respons = await addFavoriteMovie(userId, movieId)
        return respons;
    }
);
export const removeUserFavoriteMovie = createAsyncThunk(
    "users/removeUserFavoriteMovie",
    async ({ userId, movieId }) => {
        const respons = await removeFavoriteMovie(userId, movieId)
        return respons;
    }
);