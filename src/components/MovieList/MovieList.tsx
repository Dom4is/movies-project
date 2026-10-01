import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movieTypes";

export default function MovieList({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) {
    return null;
  }
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
