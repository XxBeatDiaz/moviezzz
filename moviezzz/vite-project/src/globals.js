export const LOGO = "/Logo8.png";

export const LINKS = [
  { id: 1, label: "Home", url: "/" },
  { id: 2, label: "Movies", url: "/movies" },
  { id: 3, label: "My favorites", url: "/myFavorites" },
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
  FAILED: 'failed'
};

export const YEAR_OPTIONS = {
  START_YEAR: 1900,
  CURRENT_YEAR: new Date().getFullYear(),
};