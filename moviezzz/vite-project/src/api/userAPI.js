import { fetchAction } from "./utilsAPI";
import { END_POINTS } from "../globals";

const API_URL = END_POINTS.USERS_URL;

export async function addFavoriteMovie(userId, movieId) {
    return await fetchAction(`${API_URL}/${userId}/add-favorite`, "PUT", { movieId });
}

export async function removeFavoriteMovie(userId, movieId) {
    return await fetchAction(`${API_URL}/${userId}/remove-favorite`, "PUT", { movieId });
}