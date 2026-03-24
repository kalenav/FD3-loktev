import { createAction, type Middleware } from "@reduxjs/toolkit";
import { SYMBOL_DATA_THROTTLE_INTERVAL_MS, SYMBOL_PRICE_DECIMAL_PLACES } from "../constants/constants";
import { roundMod } from "../utils/round-mod";
import { addSymbolDataPoint } from "./symbol-data.slice";

export const throttleSymbolData = createAction<{
  symbol: string,
  newTrades: Array<{ price: number, timestamp: number }>,
}>("symbolData/throttleSymbolDataPoint");

function createSymbolDataThrottlerMiddleware(): Middleware {
  const averagePriceOfTrades = (trades: Array<{ price: number, timestamp: number }>) => {
    return roundMod(trades.reduce((acc, { price }) => acc + price, 0) / trades.length, SYMBOL_PRICE_DECIMAL_PLACES);
  }

  return store => {
    const symbolToNewTrades = new Map<string, Array<{ price: number, timestamp: number }>>();
    setInterval(() => {
      const { symbolData, selectedSymbols } = store.getState();
      selectedSymbols.forEach((symbol: string) => {
        const newTrades = symbolToNewTrades.get(symbol);
        const price = newTrades?.length ? averagePriceOfTrades(newTrades) : symbolData[symbol]?.at(-1)?.price;
        (price !== undefined) && store.dispatch(addSymbolDataPoint({ symbol, price, timestamp: Date.now() }));
      });
      symbolToNewTrades.clear();
    }, SYMBOL_DATA_THROTTLE_INTERVAL_MS);

    return next => action => {
      if (!throttleSymbolData.match(action)) {
        return next(action);
      }
      const { symbol, newTrades } = action.payload;
      if (!symbolToNewTrades.has(symbol)) {
        symbolToNewTrades.set(symbol, []);
      }
      symbolToNewTrades.get(symbol)!.push(...newTrades);
    };
  }
}

export const symbolDataThrottlerMiddleware = createSymbolDataThrottlerMiddleware();
