import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  value: "",
  tagIndex: 0,
  tagType: "",
};
const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    tagAction(state, { payload }) {
      state.value = payload;
      state.tagIndex = Math.random();
    },

    // Triggger the oppening of tag container when @ is pressed
    toggleTagContainerState(state, { payload }) {
      state.tagType = payload;      
    },

    searchedValueAction(state, { payload }) {},
  },
});

export const { tagAction, toggleTagContainerState } = tagSlice.actions;
export default tagSlice;
