import Header from "../components/Header/Header";
import MovieList from "../components/MovieList/MovieList";
import { useAppSelector } from "../hooks/redux";

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items);
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
      <Header />
      <main className="py-8 sm:py-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Ваша коллекция
        </p>
        <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--color-copy)] sm:text-5xl">
          Избранное
        </h1>
        <p className="mt-4 text-[var(--color-muted)]">
          {favorites.length > 0
            ? `${favorites.length} фильмов в вашей коллекции`
            : "Сохраняйте фильмы, к которым хочется вернуться."}
        </p>
        <section className="mt-10">
          {favorites.length > 0 ? (
            <MovieList movies={favorites} />
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center">
              <h2 className="text-xl font-bold text-[var(--color-copy)]">
                Коллекция пока пуста
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--color-muted)]">
                Откройте поиск и нажмите на значок плюс, чтобы сохранить фильм.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
