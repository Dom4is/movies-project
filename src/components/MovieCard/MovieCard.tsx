import { Link } from "react-router-dom";
import type { Movie } from "../../types/movieTypes";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-slate-800 dark:text-white truncate">
            {movie.Title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {movie.Year} • {movie.Type}
          </p>
        </div>
      </div>
    </Link>
  );
}
