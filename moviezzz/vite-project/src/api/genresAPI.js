import { fetchAction } from './utilsAPI.js';
import { END_POINTS } from '../globals.js';

const API_URL = END_POINTS.GENRES_URL;

export function getGenres() {
    return fetchAction(API_URL);
}