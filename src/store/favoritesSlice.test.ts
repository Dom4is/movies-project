import { describe, expect, it } from "vitest";
import { addFavorite, favoritesSlice, removeFavorite } from "./favoritesSlice";
import type { Movie } from "../types/movieTypes";

const movie: Movie = {
  Title: "The Matrix",
  Year: "1999",
  imdbID: "tt0133093",
  Type: "movie",
  Poster: "matrix.jpg",
};

describe("favoritesSlice", () => {
  it("adds a movie once", () => {
    const state = favoritesSlice.reducer(undefined, addFavorite(movie));
    const nextState = favoritesSlice.reducer(state, addFavorite(movie));

    expect(nextState.items).toEqual([movie]);
  });

  it("removes a movie by imdb id", () => {
    const state = favoritesSlice.reducer(undefined, addFavorite(movie));
    const nextState = favoritesSlice.reducer(
      state,
      removeFavorite(movie.imdbID),
    );

    expect(nextState.items).toEqual([]);
  });
});
