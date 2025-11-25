import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectMoviesStatus } from "../redux/slices/movies";
import { selectGenresStatus } from "../redux/slices/genres";
import { selectMoviesIdsFromUser, selectUserStatus } from "../redux/slices/user";

import { fetchManyMovies, fetchMovies } from "../redux/thunks/moviesThunks";
import { fetchGenres } from "../redux/thunks/genresThunks";

export default function useOnStart() {
    const dispatch = useDispatch();

    const moviesStatus = useSelector(selectMoviesStatus);
    const genresStatus = useSelector(selectGenresStatus);
    const userStatus = useSelector(selectUserStatus);
    const moviesIds = useSelector(selectMoviesIdsFromUser);

    useEffect(() => {
        if (moviesStatus === "idle") {
            dispatch(fetchMovies());
        }
    }, [dispatch, moviesStatus]);

    useEffect(() => {
        if (genresStatus === "idle") {
            dispatch(fetchGenres());
        }
    }, [dispatch, genresStatus])

    useEffect(() => {
        if (userStatus === "succeeded" && moviesIds.length > 0) {
            dispatch(fetchManyMovies(moviesIds));
        }
    }, [dispatch, userStatus, moviesIds]);
}