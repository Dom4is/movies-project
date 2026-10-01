import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import { useAppSelector } from "./hooks/redux";
import { useEffect } from "react";

export default function App() {
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("movie-theme", theme);
  }, [theme]);

  const favorites = useAppSelector((state) => state.favorites.items);

  useEffect(() => {
    window.localStorage.setItem("movie-favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-copy)]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}
