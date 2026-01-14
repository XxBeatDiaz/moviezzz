import { fetchAction } from "./utilsAPI";
import { END_POINTS } from "../globals";

const API_URL = END_POINTS.USERS_URL;

export const addFavoriteMovie = (userId, movieId) => {
    return fetchAction(`${API_URL}/${userId}/add-favorite`, "PUT", { movieId });
}

export const removeFavoriteMovie = (userId, movieId) => {
    return fetchAction(`${API_URL}/${userId}/remove-favorite`, "PUT", { movieId });
}