import { fetchAction } from './utilsAPI.js';
import { END_POINTS } from '../globals.js';

const API_URL = END_POINTS.MOVIES_URL;

export const getMovies = () => fetchAction(API_URL);

export const getLenOfMovies = () => fetchAction(`${API_URL}/len`);

export const getMoviesPage = (pageNum) => fetchAction(`${API_URL}/page/${pageNum}`)

export const getMoviesByFilters = (name, year, genres, pageNum) => {
    
    const params = new URLSearchParams();

    name && params.set('name', name);
    year && params.set('year', year);

    if (genres) {
        (Array.isArray(genres) ?
            genres.forEach(genre => params.append('genre', genre)) :
            params.set('genre', genres))
    };

    params.set("pageNum", pageNum);
    

    return fetchAction(`${API_URL}/search?${params}`);
}

export const getMovieById = (movieId) => fetchAction(`${API_URL}/${movieId}`);

export const getMoviesByIds = (moviesIds) => {
    const params = new URLSearchParams();

    moviesIds && moviesIds.forEach(movieId => params.append("moviesIds", movieId));

    return fetchAction(`${API_URL}/many?${params}`);
}
