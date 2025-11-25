import { fetchAction } from './utilsAPI.js';
import { endPoints } from '../globals.js';

const API_URL = endPoints.moviesUrl;

export async function getMovies() {
    return await fetchAction(`${API_URL}`);
}

export async function getMoviesByFilters(name = '', year = '', genres = '') {
    const params = new URLSearchParams();

    if (name) params.append('name', name);
    if (year) params.append('year', year);
    if (genres) {
        if (Array.isArray(genres)) {
            genres.forEach(g => params.append('genre', g));
        } else {
            params.append('genre', genres);
        }
    }

    return await fetchAction(`${API_URL}/search?${params.toString()}`);
}

export async function getMovieById(id) {
    return await fetchAction(`${API_URL}/${id}`);
}

export async function getMoviesByIds(moviesIds) {
    const params = new URLSearchParams();

    moviesIds.forEach(id => params.append("moviesIds", id));

    return await fetchAction(`${API_URL}/many?${params.toString()}`);
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
