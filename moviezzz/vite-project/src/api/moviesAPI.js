import { fetchAction } from './utilsAPI.js';
import { endPoints } from '../globals.js';

const API_URL = endPoints.moviesUrl;

export async function getMovies() {
    return await fetchAction(`${API_URL}`);
}

export async function getMoviesByFilters(name, year, genres) {
    const params = new URLSearchParams();

    name && params.set('name', name);
    year && params.set('year', year);

    genres && (Array.isArray(genres) ?
        genres.forEach(genre => params.append('genre', genre)) :
        params.set('genre', genres));

    return await fetchAction(`${API_URL}/search?${params}`);
}

export async function getMovieById(id) {
    return await fetchAction(`${API_URL}/${id}`);
}

export async function getMoviesByIds(moviesIds) {
    const params = new URLSearchParams();

    moviesIds && moviesIds.forEach(movieId => params.append("moviesIds", movieId));

    return await fetchAction(`${API_URL}/many?${params}`);
}

// export async function createMovie(movieData) {
//     return await fetchAction(`${API_URL}`, 'POST', movieData);
// }

// export async function updateMovie(id, movieData) {
//     return await fetchAction(`${API_URL}/${id}`, 'PUT', movieData);
// }

// export async function deleteMovie(id) {
//     return await fetchAction(`${API_URL}/${id}`, 'DELETE');
// }
