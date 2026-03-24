import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFinnhubWS } from "../contexts/finnhub-ws.context";
import type { SymbolDataState } from "../redux/symbol-data.slice";

export function useLiveSymbolData(symbols: string[]) {
  const { subscribeToSymbolUpdates } = useFinnhubWS();
  const symbolData = useSelector((state: { symbolData: SymbolDataState }) => state.symbolData);
  const selectedSymbols = useSelector((state: { selectedSymbols: Array<string> }) => state.selectedSymbols);
  useEffect(() => {
    symbols.filter(symbol => !selectedSymbols.includes(symbol)).forEach(subscribeToSymbolUpdates);
  }, [subscribeToSymbolUpdates, selectedSymbols]);

  return Object.fromEntries(symbols.map(symbol => [symbol, symbolData[symbol] ?? []]));
}