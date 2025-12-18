export function getMoviesSlice(offset, limit, movies) {
    const total = movies.length;

    const moviesPage = movies.slice(offset, offset + limit);

    return {
        movies: moviesPage,
        total: total,
    };
}