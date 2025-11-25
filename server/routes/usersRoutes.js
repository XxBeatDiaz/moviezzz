import { addNewFavoriteMovieId, removeFavoriteMovieId, getUser } from "../controlers/users.ctrl.js";
import express from 'express';

const usersRouter = express.Router();

usersRouter.get('/login', getUser);
usersRouter.put('/:userId/add-favorite', addNewFavoriteMovieId);
usersRouter.put('/:userId/remove-favorite', removeFavoriteMovieId);

export default usersRouter;
