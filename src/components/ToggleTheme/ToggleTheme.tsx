import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleTheme } from "../../store/themeSlice";

export default function ToggleTheme() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {theme === "dark" ? "🌚" : "🌞"}
    </button>
  );
}
