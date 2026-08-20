import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/moviesApi";
import type { MovieDetails } from "../types/movieTypes";
import Header from "../components/Header/Header";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("Ошибка загрузки фильма", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Загрузка...</p>;
  if (!movie) return <p className="text-center mt-10">Фильм не найден</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Header />
      <div className="flex flex-col md:flex-row gap-8 py-4">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="w-full md:w-64 rounded-xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            {movie.Title} ({movie.Year})
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {movie.Genre} • {movie.Runtime}
          </p>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            {movie.Plot}
          </p>
          <div className="mt-4 space-y-1 text-sm text-slate-500 dark:text-slate-400">
            <p>
              <strong>Режиссёр:</strong> {movie.Director}
            </p>
            <p>
              <strong>Актёры:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Рейтинг IMDb:</strong> {movie.imdbRating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
