import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { selectMoviesStatus } from "../redux/slices/movies";
import { selectGenresStatus } from "../redux/slices/genres";
import { selectFavStatus, selectMoviesIdsFromUser, selectUserStatus } from "../redux/slices/user";

import { fetchManyMovies, fetchPageOfMovies, fetchTheNewestMovies } from "../redux/thunks/moviesThunks";
import { fetchGenres } from "../redux/thunks/genresThunks";
import { AMOUNT_MOVIES_IN_PAGE, NEWEST_MOVIES, STATUS_OPTIONS } from "../globals";

export default function useOnStart() {
    const location = useLocation();
    const dispatch = useDispatch();

    const moviesStatus = useSelector(selectMoviesStatus);
    const genresStatus = useSelector(selectGenresStatus);
    const userStatus = useSelector(selectUserStatus);
    const moviesIds = useSelector(selectMoviesIdsFromUser);
    const favStatus = useSelector(selectFavStatus)

    useEffect(() => {
        if (moviesStatus === STATUS_OPTIONS.IDLE) {
            dispatch(fetchTheNewestMovies(NEWEST_MOVIES));
            dispatch(fetchPageOfMovies(AMOUNT_MOVIES_IN_PAGE))
        }
    }, [dispatch, moviesStatus]);

    useEffect(() => {
        if (genresStatus === STATUS_OPTIONS.IDLE) {
            dispatch(fetchGenres());
        }
    }, [dispatch, genresStatus])

    useEffect(() => {
        if (userStatus === STATUS_OPTIONS.SUCCEEDED && location.pathname === "/myFavorites") {
            dispatch(fetchManyMovies(moviesIds));
        }
    }, [dispatch, userStatus, moviesIds, favStatus, location.pathname]);
}