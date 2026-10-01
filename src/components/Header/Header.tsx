import { Link, NavLink } from "react-router-dom";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { useAppSelector } from "../../hooks/redux";

export default function Header() {
  const favoritesCount = useAppSelector(
    (state) => state.favorites.items.length,
  );

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-5">
      <Link
        to="/"
        className="text-xl font-black tracking-[-0.04em] text-[var(--color-copy)] transition-colors hover:text-[var(--color-accent)]"
      >
        MOVIE<span className="text-[var(--color-accent)]">/</span>SEARCH
      </Link>

      <nav className="order-3 flex w-full items-center gap-5 text-sm sm:order-2 sm:w-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-colors hover:text-[var(--color-accent)] ${isActive ? "font-bold text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`
          }
        >
          Поиск
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `transition-colors hover:text-[var(--color-accent)] ${isActive ? "font-bold text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`
          }
        >
          Избранное{" "}
          <span className="text-[var(--color-copy)]">({favoritesCount})</span>
        </NavLink>
      </nav>

      <div className="order-2 sm:order-3">
        <ToggleTheme />
      </div>
    </header>
  );
}
