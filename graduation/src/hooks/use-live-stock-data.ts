import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFinnhubWS } from "../contexts/finnhub-ws.context";
import type { StockDataState } from "../redux/stock-data.slice";

export function useLiveStockData(symbols: string[]) {
  const { subscribeToSymbolUpdates } = useFinnhubWS();
  const stockData = useSelector((state: { stockData: StockDataState }) => state.stockData);
  useEffect(() => {
    symbols.filter(symbol => !(symbol in stockData)).forEach(subscribeToSymbolUpdates);
  }, [subscribeToSymbolUpdates, stockData]);

  return Object.fromEntries(symbols.map(symbol => [symbol, stockData[symbol] ?? []]));
}