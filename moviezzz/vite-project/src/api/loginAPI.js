import { fetchAction } from './utilsAPI.js';
import { endPoints } from '../globals.js';

const API_URL = endPoints.loginUrl;

export async function login(username = '', password = '') {
    const params = new URLSearchParams();

    if (username) params.append('username', username);
    if (password) params.append('password', password);

    return await fetchAction(`${API_URL}${params.toString()}`);
}
