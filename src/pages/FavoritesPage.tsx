import Header from "../components/Header/Header";
import MovieList from "../components/MovieList/MovieList";
import { useAppSelector } from "../hooks/redux";

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items);
  return (
    <div className="py-8 max-w-6xl mx-auto">
      <Header />
      {/* <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white ">
        Избранное
      </h1> */}
      <section className="mx-auto py-4">
        {favorites.length > 0 ? (
          <MovieList movies={favorites} />
        ) : (
          <h2 className="text-center text-slate-600 dark:text-slate-300 mt-8">
            Нет избранных фильмов{" "}
          </h2>
        )}
      </section>
    </div>
  );
}
