import { createSlice } from "@reduxjs/toolkit";
import { MAX_DATA_POINTS_PER_STOCK } from "../constants/constants";

const stockDataSlice = createSlice({
  name: 'stockData',
  initialState: {} as Record<string, Array<{ timestamp: number; price: number }>>,
  reducers: {
    addStockDataPoint: (state, action) => {
      const { stockSymbol, timestamp, price } = action.payload;
      state[stockSymbol] ??= [];
      state[stockSymbol].push({ timestamp, price });
      if (state[stockSymbol].length > MAX_DATA_POINTS_PER_STOCK) {
        state[stockSymbol].shift();
      }
    }
  }
});

export type StockDataState = ReturnType<typeof stockDataSlice.reducer>;
export const { addStockDataPoint } = stockDataSlice.actions;
export default stockDataSlice.reducer;