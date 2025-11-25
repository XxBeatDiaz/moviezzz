import { fetchAction } from './utilsAPI.js';
import { endPoints } from '../globals.js';

const API_URL = endPoints.genresUrl;

export async function getGenres() {
    return await fetchAction(`${API_URL}`);
}