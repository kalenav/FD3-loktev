import { createSlice } from "@reduxjs/toolkit";
import { MAX_DATA_POINTS_PER_SYMBOL } from "../constants/constants";

const symbolDataSlice = createSlice({
  name: 'symbolData',
  initialState: {} as Record<string, Array<{ timestamp: number; price: number }>>,
  reducers: {
    addSymbolDataPoint: (state, action) => {
      const { symbol, timestamp, price } = action.payload;
      state[symbol] ??= [];
      state[symbol].push({ timestamp, price });
      if (state[symbol].length > MAX_DATA_POINTS_PER_SYMBOL) {
        state[symbol].shift();
      }
    },
    deleteSymbolData: (state, action) => {
      delete state[action.payload];
    }
  }
});

export type SymbolDataState = ReturnType<typeof symbolDataSlice.reducer>;
export const { addSymbolDataPoint, deleteSymbolData } = symbolDataSlice.actions;
export default symbolDataSlice.reducer;