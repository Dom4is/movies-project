import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("s") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [year, setYear] = useState(searchParams.get("y") || "");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextParams = new URLSearchParams();
    nextParams.set("s", query.trim());
    if (type) nextParams.set("type", type);
    if (year) nextParams.set("y", year);
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.14)] sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:items-center"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
        placeholder="Название фильма (на английском)..."
        className="h-12 min-w-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 text-[var(--color-copy)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="h-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 text-[var(--color-copy)] focus:border-[var(--color-accent)] focus:outline-none"
      >
        <option value="">Все</option>
        <option value="movie">Фильм</option>
        <option value="series">Сериал</option>
        <option value="episode">Эпизод</option>
      </select>
      <input
        type="number"
        placeholder="Год..."
        value={year}
        onChange={(e) => setYear(e.target.value)}
        min="1900"
        max="2026"
        className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 text-[var(--color-copy)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none sm:w-28"
      />
      <button
        type="submit"
        className="h-12 rounded-xl bg-[var(--color-accent)] px-6 font-bold text-white transition-colors hover:bg-[var(--color-accent-strong)]"
      >
        Найти
      </button>
    </form>
  );
}
