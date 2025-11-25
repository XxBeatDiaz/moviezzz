import express from 'express';

import { getMovies, getOneMovieById, getMoviesByFiltersCtrl, getManyMoviesByIds } from "../controlers/movies.ctrl.js";

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);
moviesRouter.get('/many', getManyMoviesByIds)
moviesRouter.get('/search', getMoviesByFiltersCtrl);
moviesRouter.get('/:id', getOneMovieById);

export default moviesRouter;
