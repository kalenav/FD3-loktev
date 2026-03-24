import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFinnhubWS } from "../contexts/finnhub-ws.context";
import type { StockDataState } from "../redux/stock-data.slice";

export function useLiveStockData(symbols: string[]) {
  const { subscribeToSymbolUpdates } = useFinnhubWS();
  const stockData = useSelector((state: { stockData: StockDataState }) => state.stockData);
  const selectedSymbols = useSelector((state: { selectedSymbols: Array<string> }) => state.selectedSymbols);
  useEffect(() => {
    symbols.filter(symbol => !selectedSymbols.includes(symbol)).forEach(subscribeToSymbolUpdates);
  }, [subscribeToSymbolUpdates, selectedSymbols]);

  return Object.fromEntries(symbols.map(symbol => [symbol, stockData[symbol] ?? []]));
}