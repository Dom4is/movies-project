import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleTheme } from "../../store/themeSlice";

export default function ToggleTheme() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={
        theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
      }
      className="flex h-10 items-center gap-2 rounded-full border border-[var(--color-border)] px-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      <span aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span>
      {theme === "dark" ? "Светлая" : "Тёмная"}
    </button>
  );
}
