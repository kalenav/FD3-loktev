import { createSlice } from "@reduxjs/toolkit";

const stockDataSlice = createSlice({
  name: 'stockData',
  initialState: {} as Record<string, Array<{ timestamp: number; price: number }>>,
  reducers: {
    addStockDataPoint: (state, action) => {
      const { stockSymbol, timestamp, price } = action.payload;
      state[stockSymbol] ??= [];
      if (state[stockSymbol].at(-1)?.timestamp === timestamp) {
        return;
      }
      state[stockSymbol].push({ timestamp, price });
    }
  }
});

export type StockDataState = ReturnType<typeof stockDataSlice.reducer>;
export const { addStockDataPoint } = stockDataSlice.actions;
export default stockDataSlice.reducer;