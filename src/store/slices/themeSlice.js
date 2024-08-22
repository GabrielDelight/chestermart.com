import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  themeState: window.localStorage.getItem("theme"),
  theme_dark_class_div:
    window.localStorage.getItem("theme") === "dark" ? "dark_theme_div" : "",
  light_theme_dark_class_div:
    window.localStorage.getItem("theme") === "dark"
      ? "light_theme_dark_class_div"
      : "",
  tranparent_theme:
    window.localStorage.getItem("theme") === "dark" ? "tranparent_theme" : "",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      console.log(payload);
      if (payload === "dark") {
        state.light_theme_dark_class_div = "light_theme_dark_class_div";
        state.theme_dark_class_div = "dark_theme_div";
        state.tranparent_theme = "tranparent_theme";
        state.themeState = 'dark'
      } else {
        state.light_theme_dark_class_div = "";
        state.theme_dark_class_div = "";
        state.tranparent_theme = "";
        state.themeState = 'white'
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice;
