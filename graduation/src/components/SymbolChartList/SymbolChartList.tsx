import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SYMBOL_CHART_LIST_ANIMATION_DURATION_MS } from "../../constants/constants";
import { useFinnhubWS } from "../../contexts/finnhub-ws.context";
import { untrackSymbol } from "../../redux/selected-symbols.slice";
import type { SymbolDataState } from "../../redux/symbol-data.slice";
import { SymbolSelect } from "../SymbolSelect/SymbolSelect";
import { SymbolCard } from "./SymbolCard/SymbolCard";
import './SymbolChartList.scss';
import { SymbolPriceChart } from "./SymbolPriceChart/SymbolPriceChart";

export const SymbolChartList = memo(() => {
  const selectedSymbols = useSelector((state: { selectedSymbols: Array<string> }) => state.selectedSymbols);
  const prevSymbols = useRef<string[]>(selectedSymbols);
  const symbolData = useSelector((state: { symbolData: SymbolDataState }) => state.symbolData);
  const { unsubscribeFromSymbolUpdates } = useFinnhubWS();
  const dispatch = useDispatch();

  const [addingNewSymbol, setAddingNewSymbol] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(selectedSymbols[0] || null);
  const [leavingSymbol, setLeavingSymbol] = useState<string | null>(null);
  const [enteringSymbol, setEnteringSymbol] = useState<string | null>(null);

  useEffect(() => {
    const addedSymbol = selectedSymbols.find(symbol => !prevSymbols.current.includes(symbol));
    if (!addedSymbol) return;
    prevSymbols.current = selectedSymbols;
    setEnteringSymbol(addedSymbol);
    const id = setTimeout(() => setEnteringSymbol(null), SYMBOL_CHART_LIST_ANIMATION_DURATION_MS);
    return () => clearTimeout(id);
  }, [selectedSymbols]);

  const onDelete = useCallback((symbol: string) => {
    dispatch(untrackSymbol(symbol));
    unsubscribeFromSymbolUpdates?.(symbol);

    (symbol === selectedSymbol) && setSelectedSymbol(null);
    setLeavingSymbol(symbol);
    const id = setTimeout(() => setLeavingSymbol(null), SYMBOL_CHART_LIST_ANIMATION_DURATION_MS);
    return () => clearTimeout(id);
  }, [selectedSymbol, unsubscribeFromSymbolUpdates]);

  const getLastPrice = (symbol: string) => {
    const data = symbolData[symbol];
    if (!data?.length) return null;
    return data[data.length - 1].price;
  };

  return (
    <div className="symbol-chart-list">
      <div className="sidebar">
        <div className="add-new-symbol-container">
          {addingNewSymbol
            ? <SymbolSelect
              onSelect={() => setAddingNewSymbol(false)}
              onCancel={() => setAddingNewSymbol(false)}
            />
            : <button className="btn-add" onClick={() => setAddingNewSymbol(true)}>
              + Track symbol
            </button>}
        </div>
        <div className="symbols-container">
          {selectedSymbols.map(symbol => (
            <SymbolCard
              key={symbol}
              name={symbol}
              price={getLastPrice(symbol)}
              isSelected={symbol === selectedSymbol}
              isLeaving={symbol === leavingSymbol}
              isEntering={symbol === enteringSymbol}
              onSelect={() => setSelectedSymbol(symbol)}
              onDelete={() => onDelete(symbol)}
            />
          ))}
        </div>
      </div>
      <div className="chart-container">
        {selectedSymbol && (
          <div className="chart-content">
            <SymbolPriceChart symbol={selectedSymbol} />
          </div>
        )}
      </div>
    </div>
  );
});