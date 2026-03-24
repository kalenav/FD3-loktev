import { createAction, type Middleware } from "@reduxjs/toolkit";
import { STOCK_DATA_THROTTLE_INTERVAL_MS, STOCK_PRICE_DECIMAL_PLACES } from "../constants/constants";
import { roundMod } from "../utils/round-mod";
import { addStockDataPoint } from "./stock-data.slice";

export const throttleStockData = createAction<{
  stockSymbol: string,
  newTrades: Array<{ price: number, timestamp: number }>,
}>("stockData/throttleStockDataPoint");

function createStockDataThrottlerMiddleware(): Middleware {
  const averagePriceOfTrades = (trades: Array<{ price: number, timestamp: number }>) => {
    return roundMod(trades.reduce((acc, { price }) => acc + price, 0) / trades.length, STOCK_PRICE_DECIMAL_PLACES);
  }

  return store => {
    const symbolToNewTrades = new Map<string, Array<{ price: number, timestamp: number }>>();
    setInterval(() => {
      const { stockData, selectedSymbols } = store.getState();
      selectedSymbols.forEach((stockSymbol: string) => {
        const newTrades = symbolToNewTrades.get(stockSymbol);
        const price = newTrades?.length ? averagePriceOfTrades(newTrades) : stockData[stockSymbol]?.at(-1)?.price;
        (price !== undefined) && store.dispatch(addStockDataPoint({ stockSymbol, price, timestamp: Date.now() }));
      });
      symbolToNewTrades.clear();
    }, STOCK_DATA_THROTTLE_INTERVAL_MS);

    return next => action => {
      if (!throttleStockData.match(action)) {
        return next(action);
      }
      const { stockSymbol, newTrades } = action.payload;
      if (!symbolToNewTrades.has(stockSymbol)) {
        symbolToNewTrades.set(stockSymbol, []);
      }
      symbolToNewTrades.get(stockSymbol)!.push(...newTrades);
    };
  }
}

export const stockDataThrottlerMiddleware = createStockDataThrottlerMiddleware();
