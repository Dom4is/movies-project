import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movieTypes";

export default function MovieList({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
