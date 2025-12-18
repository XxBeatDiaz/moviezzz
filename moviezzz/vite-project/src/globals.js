export const LOGO = "/Logo8.png";

export const LINKS = [
  { id: 1, label: "Home", url: "/" },
  { id: 2, label: "Movies", url: "/movies" },
  { id: 3, label: "Favorites", url: "/myFavorites" },
];

export const END_POINTS = {
  USERS_URL: 'http://localhost:3000/users',
  GENRES_URL: 'http://localhost:3000/genres',
  LOGIN_URL: 'http://localhost:3000/users/login?',
  MOVIES_URL: 'http://localhost:3000/movies'
};

export const STATUS_OPTIONS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'rejected'
};

export const YEAR_OPTIONS = {
  START_YEAR: 1900,
  CURRENT_YEAR: new Date().getFullYear(),
};

export const MOVIE_TRAILER = "/video/matrixTrailer.mp4";

export const NEWEST_MOVIES = 7;
export const AMOUNT_MOVIES_IN_PAGE = 10;
