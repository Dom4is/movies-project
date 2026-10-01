import { describe, expect, it } from "vitest";
import { themeSlice, toggleTheme } from "./themeSlice";

describe("themeSlice", () => {
  it("starts in light mode", () => {
    const state = themeSlice.reducer(undefined, { type: "unknown" });

    expect(state.value).toBe("light");
  });

  it("toggles between light and dark mode", () => {
    const darkState = themeSlice.reducer(undefined, toggleTheme());
    const lightState = themeSlice.reducer(darkState, toggleTheme());

    expect(darkState.value).toBe("dark");
    expect(lightState.value).toBe("light");
  });
});
