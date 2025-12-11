import { getAllMovies, getMoviesByFilters, getMovieById, getMoviesByIds, getMoviesPage, getLenOfMovies } from "../services/movies.service.js";


export function getMovies(req, res) {
  try {
    const movies = getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Faild to fetch movies' })
  }
}

export function getLenMovies(req, res) {
  try {
    const lenOfMovies = getLenOfMovies();
    res.json(lenOfMovies);
  } catch (error) {
    res.status(500).json({ error: 'Faild to fetch movies' })
  }
}

export function getOneMoviesPage(req, res) {
  const { pageNum } = req.params

  try {
    const movies = getMoviesPage(Number(pageNum));

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Faild to fetch movies' })
  }
}

export function getMoviesByFiltersCtrl(req, res) {
  try {
    const { name = '', year = '', genre = '', pageNum } = req.query;

    const filteredMovies = getMoviesByFilters({ name, year, genre }, Number(pageNum));

    if (!filteredMovies || filteredMovies.length === 0) {
      return res.status(404).json({ msg: "movies not found" })
    }

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
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Faild to fetch movie: ${id} ` })
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
    res.status(500).json({ error: `Faild to fetch movies: ${moviesIds} ` })
  }
}
