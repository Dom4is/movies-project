import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../types/movieTypes";

export interface FavoritesState {
  items: Movie[];
}

function loadSavedFavorites(): Movie[] {
  try {
    const storedFavorites =
      typeof window !== "undefined"
        ? window.localStorage.getItem("movie-favorites")
        : null;
    return storedFavorites ? (JSON.parse(storedFavorites) as Movie[]) : [];
  } catch {
    return [];
  }
}

const initialState: FavoritesState = {
  items: loadSavedFavorites(),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.some(
        (item) => item.imdbID === action.payload.imdbID,
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.imdbID !== action.payload,
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
