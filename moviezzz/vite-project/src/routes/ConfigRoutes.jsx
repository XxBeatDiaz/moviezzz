import { Route, Routes } from "react-router";

import HomePage from "../pages/Home.page";
import AllMoviesPage from "../pages/AllMovies.page";
import MoviePage from "../pages/Movie.page";
import MyFavorites from "../pages/MyFavorites.page";
import NotFound from "../pages/NotFound";

export default function ConfigRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<AllMoviesPage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/myFavorites" element={<MyFavorites />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
