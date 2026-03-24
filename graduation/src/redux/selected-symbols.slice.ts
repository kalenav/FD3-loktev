import { createSlice } from "@reduxjs/toolkit";

const selectedSymbolsSlice = createSlice({
  name: 'selectedSymbols',
  initialState: [] as Array<string>,
  reducers: {
    addSymbol: (state, action: { payload: string }) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeSymbol: (state, action: { payload: string }) => {
      state = state.filter(symbol => symbol !== action.payload);
    }
  }
});

export const { addSymbol, removeSymbol } = selectedSymbolsSlice.actions;
export default selectedSymbolsSlice.reducer;