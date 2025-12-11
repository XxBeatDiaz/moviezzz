import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

import AddToFavoritesBtn from "./AddToFavoritesBtn";
import { showAlert } from "../../redux/slices/alert";

import {
  selectUserStatus,
  selectMoviesIdsFromUser,
  selectUser,
} from "../../redux/slices/user";

import {
  addUserFavoriteMovie,
  removeUserFavoriteMovie,
} from "../../redux/thunks/userThunks";
import { STATUS_OPTIONS } from "../../globals";

export default function MovieCard({ movieId, title, posterPath, year }) {
  const dispatch = useDispatch();

  const userStatus = useSelector(selectUserStatus);
  const user = useSelector(selectUser);
  const favoriteMoviesIds = useSelector(selectMoviesIdsFromUser);

  const userId = user?.id;

  const isFavorite = favoriteMoviesIds.includes(Number(movieId));

  const handleUserAddFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await dispatch(addUserFavoriteMovie({ userId, movieId })).unwrap();
      dispatch(
        showAlert({ type: "success", message: "Movie added successfully" })
      );
    } catch (error) {
      dispatch(
        showAlert({
          type: "error",
          message: `Failed to add movie. <${error.message}>`,
        })
      );
    }
  }

  const handleUserRemoveFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await dispatch(removeUserFavoriteMovie({ userId, movieId })).unwrap();
      dispatch(
        showAlert({ type: "success", message: "Movie removed successfully" })
      );
    } catch (error) {
      dispatch(
        showAlert({
          type: "error",
          message: `Failed to remove movie. <${error.message}>`,
        })
      );
    }
  }

  return (
    <Link to={`/movie/${movieId}`} style={{ textDecoration: "none" }}>
      <Box sx={{ width: 190 }}>
        <Card
          sx={{
            backgroundColor: "#743434ff",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#ff000092",
              transform: "rotate(-0.1deg) scale(1.008)",
            },
            transition: "all 0.2s ease-in-out",
            height: 370,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            sx={{ minHeight: 270, maxHeight: 270 }}
            component="img"
            image={posterPath}
            alt={title}
          />

          <CardContent
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ffacac3d",
                borderRadius: "2px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#ffffff80",
              },

              overflowY: "auto",
              p: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Typography fontFamily="sans-serif" variant="h7" fontWeight="bold">
              {title}
            </Typography>

            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              {userStatus === STATUS_OPTIONS.SUCCEEDED ? (
                <AddToFavoritesBtn
                  initialFilled={isFavorite}
                  onAddClick={handleUserAddFavorite}
                  onRemoveClick={handleUserRemoveFavorite}
                />
              ) : null}

              <Typography
                sx={{
                  width: "20%",
                  fontFamily: "sans-serif",
                  color: "#c9c9c9ea",
                }}
              >
                {year}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
}
