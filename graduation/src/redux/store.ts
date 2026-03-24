import { configureStore } from "@reduxjs/toolkit";
import { cleanupAfterSymbolDeleteMiddleware } from "./cleanup-after-symbol-delete.middleware";
import selectedSymbolsReducer from "./selected-symbols.slice";
import { symbolDataThrottlerMiddleware } from "./symbol-data-throttler.middleware";
import symbolDataSliceReducer from "./symbol-data.slice";

export const store = configureStore({
  reducer: {
    symbolData: symbolDataSliceReducer,
    selectedSymbols: selectedSymbolsReducer,
  },
  middleware: (getDefault) => getDefault()
    .concat(symbolDataThrottlerMiddleware)
    .concat(cleanupAfterSymbolDeleteMiddleware)
});