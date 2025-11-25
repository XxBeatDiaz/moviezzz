import { fetchAction } from "./utilsAPI";
import { endPoints } from "../globals";

const API_URL = endPoints.usersUrl;

export async function addFavoriteMovie(userId, movieId) {
    return await fetchAction(`${API_URL}/${userId}/add-favorite`, "PUT", { movieId });
}
export async function removeFavoriteMovie(userId, movieId) {
    return await fetchAction(`${API_URL}/${userId}/remove-favorite`, "PUT", { movieId });
}