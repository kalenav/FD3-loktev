import { createSlice } from "@reduxjs/toolkit";

const selectedSymbolsSlice = createSlice({
  name: 'selectedSymbols',
  initialState: [] as Array<string>,
  reducers: {
    trackSymbol: (state, action: { payload: string }) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    untrackSymbol: (state, action: { payload: string }) => {
      return state.filter(symbol => symbol !== action.payload);
    }
  }
});

export const { trackSymbol, untrackSymbol } = selectedSymbolsSlice.actions;
export default selectedSymbolsSlice.reducer;