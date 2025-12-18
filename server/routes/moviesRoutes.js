import express from 'express';

import { getMovies, getOneMovieById, getMoviesByFiltersCtrl, getManyMoviesByIds, getOneMoviesPage, getTheNewest } from "../controlers/movies.ctrl.js";

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);
moviesRouter.get('/many', getManyMoviesByIds)
moviesRouter.get('/newestMovies/:amount', getTheNewest)
moviesRouter.get('/search', getMoviesByFiltersCtrl);
moviesRouter.get('/page', getOneMoviesPage)
moviesRouter.get('/:id', getOneMovieById);

export default moviesRouter;
