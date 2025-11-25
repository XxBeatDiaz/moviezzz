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

export const putFavoriteMovie = createAsyncThunk(
    "users/putFavoriteMovie",
    async ({userId, movieId}) => {
        const respons = await addFavoriteMovie(userId, movieId)
        return respons;
    }
);
export const deleteFavoriteMovie = createAsyncThunk(
    "users/deleteFavoriteMovie",
    async ({userId, movieId}) => {
        const respons = await removeFavoriteMovie(userId, movieId)
        return respons;
    }
);