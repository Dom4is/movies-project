import { useState } from "react";
import type { Movie } from "../types/movieTypes";
import MovieList from "../components/MovieList/MovieList";
import SearchBar from "../components/SearchBar/SearchBar";
import { searchMoviesApi } from "../api/moviesApi";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchMoviesApi(query);
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "Ничего не найдено");
      }
    } catch (err) {
      setError("Ошибка сети. Попробуйте позже.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white ">
        Поиск фильмов
      </h1>
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <p className="text-center mt-8 text-slate-600 dark:text-slate-300">
          Загрузка...
        </p>
      )}
      {error && <p className="text-center mt-8 text-red-500">{error}</p>}

      <section className="mt-8">
        {!loading && !error && <MovieList movies={movies} />}
      </section>
    </div>
  );
}
