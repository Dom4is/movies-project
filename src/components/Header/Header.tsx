import { Link, NavLink } from "react-router-dom";
import ToggleTheme from "../ToggleTheme/ToggleTheme"; // если есть
import { useAppSelector } from "../../hooks/redux";

export default function Header() {
  const favoritesCount = useAppSelector(
    (state) => state.favorites.items.length,
  );

  return (
    <header className="flex items-center justify-between max-w-6xl mx-auto bg-white dark:bg-gray-900 shadow-sm">
      {/* Логотип */}
      <Link
        to="/"
        className="text-xl font-bold text-slate-800 dark:text-white hover:text-indigo-500 transition-colors"
      >
        🎬 MovieSearch
      </Link>

      {/* Навигация */}
      <nav className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors ${isActive ? "text-indigo-500 font-semibold" : ""}`
          }
        >
          Поиск
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors ${isActive ? "text-indigo-500 font-semibold" : ""}`
          }
        >
          Избранное ({favoritesCount})
        </NavLink>
      </nav>

      {/* Переключатель темы */}
      <ToggleTheme />
    </header>
  );
}
