import { fetchAction } from "./utilsAPI";
import { END_POINTS } from "../globals";

const API_URL = END_POINTS.USERS_URL;

export function addFavoriteMovie(userId, movieId) {
    return fetchAction(`${API_URL}/${userId}/add-favorite`, "PUT", { movieId });
}

export function removeFavoriteMovie(userId, movieId) {
    return fetchAction(`${API_URL}/${userId}/remove-favorite`, "PUT", { movieId });
}