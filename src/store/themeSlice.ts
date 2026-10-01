import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  value: "light" | "dark";
}

function loadSavedTheme(): string | null {
  try {
    return typeof window !== "undefined"
      ? window.localStorage.getItem("movie-theme")
      : null;
  } catch {
    return null;
  }
}

const savedTheme = loadSavedTheme();

const initialState: ThemeState = {
  value: savedTheme === "dark" ? "dark" : "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
