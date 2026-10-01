import { Link } from "react-router-dom";
import type { Movie } from "../../types/movieTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  const isFavorite = favorites.some((item) => item.imdbID === movie.imdbID);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID));
    } else {
      dispatch(addFavorite(movie));
    }
  };
  return (
    <article className="group relative min-w-0">
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-transform duration-200 group-hover:-translate-y-1">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
            className="aspect-[2/3] w-full object-cover"
          />
          <div className="p-3 sm:p-4">
            <h3 className="truncate text-sm font-bold text-[var(--color-copy)] sm:text-base">
              {movie.Title}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
              {movie.Year} <span aria-hidden="true">/</span> {movie.Type}
            </p>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-lg text-white backdrop-blur-sm transition-colors hover:bg-[var(--color-accent)]"
        onClick={toggleFavorite}
        aria-label={
          isFavorite
            ? `Удалить ${movie.Title} из избранного`
            : `Добавить ${movie.Title} в избранное`
        }
        aria-pressed={isFavorite}
      >
        <span aria-hidden="true">{isFavorite ? "♥" : "＋"}</span>
      </button>
    </article>
  );
}
