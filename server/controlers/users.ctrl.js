import { getUserByLogin, addToFavoriteList, removeFromFavoriteList } from "../services/users.service.js";

export async function getUser(req, res) {
    const { username, password } = req.query;

    try {
        const user = await getUserByLogin(username, password);

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
}

export async function addNewFavoriteMovieId(req, res) {
    const { userId } = req.params;
    const { movieId } = req.body;

    try {
        const moviesIds = await addToFavoriteList(userId, movieId);
        res.json(moviesIds);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add favorite movie' });
    }
}

export async function removeFavoriteMovieId(req, res) {
    const { userId } = req.params;
    const { movieId } = req.body;
    
    try {
        const moviesIds = await removeFromFavoriteList(userId, movieId);
        res.json(moviesIds);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove favorite movie' });
    }
}