import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Movie, MovieSearchQuery } from "../types/movieTypes";
import MovieList from "../components/MovieList/MovieList";
import SearchBar from "../components/SearchBar/SearchBar";
import { searchMoviesApi } from "../api/moviesApi";
import Header from "../components/Header/Header";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.toString();
  const query = searchParams.get("s")?.trim() || "";
  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const type = searchParams.get("type");
  const year = searchParams.get("y");

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      if (!query) {
        setMovies([]);
        setTotalResults(0);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const params: MovieSearchQuery = { s: query, page };
      if (type === "movie" || type === "series" || type === "episode") {
        params.type = type;
      }
      if (year) params.y = year;

      try {
        const data = await searchMoviesApi(params, controller.signal);
        if (data.Response === "True") {
          setMovies(data.Search);
          setTotalResults(Number(data.totalResults) || 0);
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(data.Error || "Ничего не найдено");
        }
      } catch {
        if (!controller.signal.aborted) {
          setMovies([]);
          setTotalResults(0);
          setError("Ошибка сети. Попробуйте позже.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [page, query, retryCount, searchKey, type, year]);

  const totalPages = Math.ceil(totalResults / 10);
  const changePage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
      <Header />

      <main className="py-8 sm:py-12">
        <section className="mb-8 max-w-3xl sm:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Фильмы, сериалы, истории
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[var(--color-copy)] sm:text-6xl">
            Найдите фильм для сегодняшнего вечера.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-muted)]">
            Ищите по названию, фильтруйте по формату и собирайте свою личную
            коллекцию.
          </p>
        </section>

        <SearchBar key={searchKey} />
        {loading && (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="aspect-[2/3] animate-pulse rounded-2xl bg-[var(--color-surface)]"
              />
            ))}
          </div>
        )}
        {error && (
          <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="text-sm text-[var(--color-danger)]">{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-4 text-sm font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
            >
              Повторить поиск
            </button>
          </div>
        )}

        <section className="mt-10">
          {!loading && !error && query && <MovieList movies={movies} />}
          {!loading && !error && query && movies.length === 0 && (
            <p className="rounded-2xl border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted)]">
              По вашему запросу ничего не найдено.
            </p>
          )}
          {!loading && !error && !query && (
            <p className="text-sm text-[var(--color-muted)]">
              Введите название, чтобы начать поиск.
            </p>
          )}
          {!loading && !error && totalPages > 1 && (
            <nav
              className="mt-12 flex items-center justify-center gap-4"
              aria-label="Пагинация"
            >
              <button
                type="button"
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
                className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[var(--color-copy)] transition-colors hover:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                Назад
              </button>
              <span className="text-sm text-[var(--color-muted)]">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => changePage(page + 1)}
                className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[var(--color-copy)] transition-colors hover:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                Далее
              </button>
            </nav>
          )}
        </section>
      </main>
    </div>
  );
}
