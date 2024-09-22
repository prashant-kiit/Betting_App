import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
  name: "match",
  initialState: {
    matches: [],
  },
  reducers: {
    postMatch: (state, action) => {
      const newMatch = action.payload;
      state.matches.push(newMatch);
    },
    deleteMatch: (state, action) => {
      const id = action.payload;
      state.matches = state.matches.filter((match) => match.id !== id);
    },
  },
});

export default matchSlice.reducer;
export const { postMatch, deleteMatch } = matchSlice.actions;
