import { getAllMovies, getMoviesByFilters, getMovieById, getMoviesByIds } from "../services/movies.service.js";


export function getMovies(req, res) {
  try {
    const movies = getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Faild to fetch movies' })
  }
}

export function getMoviesByFiltersCtrl(req, res) {
  try {
    const { name = '', year = '', genre = '' } = req.query;

    const filteredMovies = getMoviesByFilters({ name, year, genre });
    res.json(filteredMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}

export function getOneMovieById(req, res) {
  try {
    const { id } = req.params;
    const movie = getMovieById(id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({error: `Faild to fetch movie: ${id} `})
  }
}

export function getManyMoviesByIds(req, res) {
  try {
    const { moviesIds } = req.query;
    const movies = getMoviesByIds(moviesIds);
    if (movies) {
      res.json(movies);
    } else {
      res.status(404).json({ message: 'Movies not found' });
    }
  } catch (error) {
    res.status(500).json({error: `Faild to fetch movies: ${moviesIds} `})
  }
}
