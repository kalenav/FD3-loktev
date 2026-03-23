import { createAction, type Middleware } from "@reduxjs/toolkit";
import { STOCK_DATA_THROTTLE_INTERVAL_MS } from "../constants/constants";
import { addStockDataPoint } from "./stock-data.slice";

export const throttleStockDataPoint = createAction<{
  stockSymbol: string;
  price: number;
  timestamp: number;
}>("stockData/throttleStockDataPoint");

function createStockDataThrottlerMiddleware(): Middleware {
  return store => {
    const symbolToLastData = new Map<string, { price: number, timestamp: number }>();
    setInterval(() => {
      const stockData = store.getState().stockData;
      const symbolsToUpdate = [...new Set([...Object.keys(stockData), ...symbolToLastData.keys()])];
      symbolsToUpdate.forEach(stockSymbol => {
        const lastData = symbolToLastData.get(stockSymbol) ?? stockData[stockSymbol].at(-1);
        if (lastData) {
          store.dispatch(addStockDataPoint({ stockSymbol, ...lastData, timestamp: Date.now() }));
        }
      });
      symbolToLastData.clear();
    }, STOCK_DATA_THROTTLE_INTERVAL_MS);

    return next => action => {
      if (!throttleStockDataPoint.match(action)) {
        return next(action);
      }
      const { stockSymbol, price, timestamp } = action.payload;
      symbolToLastData.set(stockSymbol, { price, timestamp });
    };
  }
}

export const stockDataThrottlerMiddleware = createStockDataThrottlerMiddleware();
