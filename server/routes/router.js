import express from 'express';

import moviesRouter from './moviesRoutes.js';
import usersRouter from './usersRoutes.js';
import genresRouter from './genresRoutes.js';

const router = express.Router();

router.use('/movies', moviesRouter);
router.use('/users', usersRouter);
router.use('/genres', genresRouter)

export default router;