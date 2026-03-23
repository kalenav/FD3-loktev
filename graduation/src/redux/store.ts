import { configureStore } from "@reduxjs/toolkit";
import { stockDataThrottlerMiddleware } from "./stock-data-throttler.middleware";
import stockDataSliceReducer from "./stock-data.slice";

export const store = configureStore({
  reducer: {
    stockData: stockDataSliceReducer
  },
  middleware: (getDefault) => getDefault().concat(stockDataThrottlerMiddleware)
});