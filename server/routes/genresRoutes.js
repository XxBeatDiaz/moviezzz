import express from 'express';

import { getGenres } from "../controlers/genres.ctrl.js";

const genresRouter = express.Router();

genresRouter.get('/', getGenres);

export default genresRouter;
