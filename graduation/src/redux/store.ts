import { configureStore } from "@reduxjs/toolkit";
import stockDataSliceReducer from "./stock-data.slice";

export const store = configureStore({
  reducer: {
    stockData: stockDataSliceReducer
  }
});