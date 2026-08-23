import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { MovieSearchQuery } from "../../types/movieTypes";

interface SearchBarProps {
  onSearch: (params: MovieSearchQuery) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("s") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [year, setYear] = useState(searchParams.get("y") || "");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params: {
      s: string;
      type?: "movie" | "series" | "episode";
      y?: string;
    } = {
      s: query.trim(),
    };

    if (type) params.type = type as "movie" | "series" | "episode";
    if (year) params.y = year;

    setSearchParams(params);

    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
        placeholder="Название фильма (на английском)..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        className="w-28 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
      >
        Найти
      </button>
    </form>
  );
}
