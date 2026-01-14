import { getAllGenres } from "../services/genres.service.js";

export function getGenres(req, res) {
  try {
    const genres = getAllGenres();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Faild to fetch genres' })
  }
}