import { configureStore } from "@reduxjs/toolkit";
import selectedSymbolsReducer from "./selected-symbols.slice";
import { stockDataThrottlerMiddleware } from "./stock-data-throttler.middleware";
import stockDataSliceReducer from "./stock-data.slice";

export const store = configureStore({
  reducer: {
    stockData: stockDataSliceReducer,
    selectedSymbols: selectedSymbolsReducer,
  },
  middleware: (getDefault) => getDefault().concat(stockDataThrottlerMiddleware)
});