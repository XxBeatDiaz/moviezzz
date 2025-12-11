import express from 'express';

import { getMovies, getOneMovieById, getMoviesByFiltersCtrl, getManyMoviesByIds, getOneMoviesPage, getLenMovies } from "../controlers/movies.ctrl.js";

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);
moviesRouter.get('/len', getLenMovies);
moviesRouter.get('/many', getManyMoviesByIds)
moviesRouter.get('/search', getMoviesByFiltersCtrl);
moviesRouter.get('/page/:pageNum', getOneMoviesPage)
moviesRouter.get('/:id', getOneMovieById);

export default moviesRouter;
