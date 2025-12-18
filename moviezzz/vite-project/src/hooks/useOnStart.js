import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectMoviesStatus } from "../redux/slices/movies";
import { selectGenresStatus } from "../redux/slices/genres";
import { selectFavStatus, selectMoviesIdsFromUser, selectUserStatus } from "../redux/slices/user";

import { fetchManyMovies, fetchPageOfMovies, fetchTheNewestMovies } from "../redux/thunks/moviesThunks";
import { fetchGenres } from "../redux/thunks/genresThunks";
import { AMOUNT_MOVIES_IN_PAGE, NEWEST_MOVIES, STATUS_OPTIONS } from "../globals";

export default function useOnStart() {
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
        if (userStatus === STATUS_OPTIONS.SUCCEEDED && moviesIds.length > 0 && favStatus.addFavStatus === STATUS_OPTIONS.IDLE && favStatus.removeFavStatus === STATUS_OPTIONS.IDLE ) {
            dispatch(fetchManyMovies(moviesIds));
        }
    }, [dispatch, userStatus, moviesIds, favStatus.addFavStatus, favStatus.removeFavStatus]);
}