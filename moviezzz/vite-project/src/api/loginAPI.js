import { fetchAction } from './utilsAPI.js';
import { endPoints } from '../globals.js';

const API_URL = endPoints.loginUrl;

export async function login(username, password) {
    const params = new URLSearchParams();

    username && params.set('username', username);
    password && params.set('password', password);

    return await fetchAction(`${API_URL}${params}`);
}
