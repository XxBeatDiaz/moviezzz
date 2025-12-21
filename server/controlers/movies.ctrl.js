import { getAllMovies, getMoviesByFilters, getMovieById, getMoviesByIds, getMoviesPage, getTheNewestMovies } from "../services/movies.service.js";


export function getMovies(req, res) {
  try {
    const movies = getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Faild to fetch movies' })
  }
}

export function getTheNewest(req, res) {
  const { amount } = req.params;

  try {
    const newestMovies = getTheNewestMovies(amount);

    res.json(newestMovies);
  } catch (error) {
    res.status(500).json({ error: 'Faild to fetch movies' })
  }
}

export function getOneMoviesPage(req, res) {
  const { offset, limit } = req.query

  try {
    const movies = getMoviesPage(Number(offset), Number(limit));

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Faild to fetch movies' })
  }
}

export function getMoviesByFiltersCtrl(req, res) {
  try {
    const { name = '', year = '', genre = '', offset, limit } = req.query;

    const filteredMovies = getMoviesByFilters(Number(offset), Number(limit), { name, year, genre });

    return res.json(filteredMovies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch movies' });
  }
}

export function getOneMovieById(req, res) {
  try {
    const { id } = req.params;
    const movie = getMovieById(id);

    res.json(movie);

  } catch (error) {
    res.status(500).json({ error: `Faild to fetch movie: ${id} ` })
  }
}

export function getManyMoviesByIds(req, res) {
  try {
    const { moviesIds } = req.query;

    const isArray = Array.isArray(moviesIds);

    const movies = getMoviesByIds((moviesIds && isArray ? moviesIds : [moviesIds]) || []);

    res.json(movies);

  } catch (error) {
    res.status(500).json({ error: `Faild to fetch movies` })
  }
}
