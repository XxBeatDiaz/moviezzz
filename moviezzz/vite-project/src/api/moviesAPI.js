import { fetchAction } from './utilsAPI.js';
import { END_POINTS } from '../globals.js';

const API_URL = END_POINTS.MOVIES_URL;

export async function getMovies() {
    return await fetchAction(`${API_URL}`);
}

export async function getMoviesByFilters(name, year, genres) {
    const params = new URLSearchParams();

    name && params.set('name', name);
    year && params.set('year', year);

    if (genres) {
        (Array.isArray(genres) ?
            genres.forEach(genre => params.append('genre', genre)) :
            params.set('genre', genres))
    };

    return await fetchAction(`${API_URL}/search?${params}`);
}

export async function getMovieById(movieId) {
    return await fetchAction(`${API_URL}/${movieId}`);
}

export async function getMoviesByIds(moviesIds) {
    const params = new URLSearchParams();

    moviesIds && moviesIds.forEach(movieId => params.append("moviesIds", movieId));

    return await fetchAction(`${API_URL}/many?${params}`);
}
