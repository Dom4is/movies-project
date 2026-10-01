import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/moviesApi";
import type { Movie, MovieDetails } from "../types/movieTypes";
import Header from "../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

const posterFallback = "https://via.placeholder.com/300x450?text=No+Image";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(false);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  const isFavorite = movie
    ? favorites.some((item) => item.imdbID === movie.imdbID)
    : false;

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const loadMovie = async () => {
      try {
        const data = await getMovieDetails(id, controller.signal);
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setMovie(null);
          setError(true);
        }
        setLoadedId(id);
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
          setLoadedId(id);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadMovie();

    return () => controller.abort();
  }, [id]);

  const isLoading = Boolean(id) && (loading || loadedId !== id);

  const toggleFavorite = () => {
    if (!movie) return;
    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID));
      return;
    }

    const favoriteMovie: Movie = {
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Type: movie.Type,
      Poster: movie.Poster,
    };
    dispatch(addFavorite(favoriteMovie));
  };

  if (isLoading) {
    return (
      <div className="mx-auto min-h-screen w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
        <Header />
        <main className="grid gap-8 py-8 sm:py-12 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div className="aspect-[2/3] w-full max-w-sm animate-pulse rounded-2xl bg-[var(--color-surface)]" />
          <div className="space-y-5 py-4">
            <div className="h-3 w-32 animate-pulse rounded bg-[var(--color-surface)]" />
            <div className="h-16 w-full max-w-xl animate-pulse rounded bg-[var(--color-surface)]" />
            <div className="h-5 w-48 animate-pulse rounded bg-[var(--color-surface)]" />
            <div className="h-32 w-full max-w-xl animate-pulse rounded bg-[var(--color-surface)]" />
          </div>
        </main>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="mx-auto min-h-screen w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
        <Header />
        <div className="py-20">
          <p className="text-sm text-[var(--color-danger)]">
            {error ? "Не удалось загрузить фильм." : "Фильм не найден."}
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 text-sm font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
          >
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
      <Header />
      <main className="grid gap-8 py-8 sm:py-12 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-start md:gap-12">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : posterFallback}
          alt={movie.Title}
          className="mx-auto aspect-[2/3] w-full max-w-sm rounded-2xl border border-[var(--color-border)] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.22)] md:mx-0"
        />
        <div className="max-w-2xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 text-sm font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            ← Назад к поиску
          </button>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {movie.Type} / {movie.Year}
          </p>
          <h1 className="text-4xl font-black leading-[1] tracking-[-0.05em] text-[var(--color-copy)] sm:text-6xl">
            {movie.Title} ({movie.Year})
          </h1>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            {movie.Genre} <span aria-hidden="true">/</span> {movie.Runtime}
          </p>
          <button
            type="button"
            onClick={toggleFavorite}
            aria-pressed={isFavorite}
            className="mt-6 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--color-accent-strong)]"
          >
            {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          </button>
          <p className="mt-8 text-lg leading-8 text-[var(--color-muted)]">
            {movie.Plot}
          </p>
          <div className="mt-8 grid gap-4 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-muted)] sm:grid-cols-2">
            <p className="leading-6">
              <strong className="block text-xs uppercase tracking-[0.12em] text-[var(--color-copy)]">
                Режиссёр
              </strong>
              {movie.Director}
            </p>
            <p className="leading-6">
              <strong className="block text-xs uppercase tracking-[0.12em] text-[var(--color-copy)]">
                Актёры
              </strong>
              {movie.Actors}
            </p>
            <p className="leading-6">
              <strong className="block text-xs uppercase tracking-[0.12em] text-[var(--color-copy)]">
                Рейтинг IMDb
              </strong>
              {movie.imdbRating}
            </p>
            <p className="leading-6">
              <strong className="block text-xs uppercase tracking-[0.12em] text-[var(--color-copy)]">
                Премьера
              </strong>
              {movie.Released}
            </p>
            <p className="leading-6">
              <strong className="block text-xs uppercase tracking-[0.12em] text-[var(--color-copy)]">
                Награды
              </strong>
              {movie.Awards}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
