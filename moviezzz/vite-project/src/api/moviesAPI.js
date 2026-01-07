import { fetchAction } from './utilsAPI.js';
import { END_POINTS } from '../globals.js';

const API_URL = END_POINTS.MOVIES_URL;

export const getMovies = () => fetchAction(API_URL);

export const getNewestMovies = (amount) => fetchAction(`${API_URL}/newestMovies/${amount}`);

export const getMoviesPage = (offset = 0, limit = 10) => {
    const params = new URLSearchParams({ offset, limit });

    return fetchAction(`${API_URL}/page?${params}`);
}

export const getMoviesByFilters = (name, year, genres, offset, limit) => {
    const params = new URLSearchParams();

    name && params.set('name', name);
    year && params.set('year', year);

    if (genres) {
        (Array.isArray(genres) ?
            genres.forEach(genre => params.append('genre', genre)) :
            params.set('genre', genres))
    };

    params.set("offset", offset);
    params.set("limit", limit);

    return fetchAction(`${API_URL}/search?${params}`);
}

export const getMovieById = (movieId) => fetchAction(`${API_URL}/${movieId}`);

export const getMoviesByIds = (moviesIds) => {
    const params = new URLSearchParams();

    moviesIds && moviesIds.forEach(movieId => params.append("moviesIds", movieId));

    return fetchAction(`${API_URL}/many?${params}`);
}
