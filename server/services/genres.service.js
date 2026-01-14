import genres from "../DB/genres.json"  with { type: "json" };

export function getAllGenres() {
  return  genres;
}
