import { fetchAction } from './utilsAPI.js';
import { END_POINTS } from '../globals.js';

const API_URL = END_POINTS.LOGIN_URL;

export async function login(username, password) {
    const params = new URLSearchParams();

    username && params.set('username', username);
    password && params.set('password', password);

    return await fetchAction(`${API_URL}${params}`);
}
