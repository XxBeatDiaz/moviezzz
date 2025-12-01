import { Route, Routes } from "react-router";

import HomePage from "../pages/HomePage";
import AllMoviesPage from "../pages/AllMoviesPage";
import MoviePage from "../pages/MoviePage";
import MyFavorites from "../pages/MyFavoritesPage";
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
