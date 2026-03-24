import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFinnhubWS } from "../../contexts/finnhub-ws.context";
import { untrackSymbol } from "../../redux/selected-symbols.slice";
import type { StockDataState } from "../../redux/stock-data.slice";
import { SymbolSelect } from "../SymbolSelect/SymbolSelect";
import { StockCard } from "./StockCard/StockCard";
import { StockPriceChart } from "./StockPriceChart/StockPriceChart";
import './SymbolChartList.scss';

const ANIMATION_DURATION = 450;

export const SymbolChartList = memo(() => {
  const selectedSymbols = useSelector((state: { selectedSymbols: Array<string> }) => state.selectedSymbols);
  const prevSymbols = useRef<string[]>(selectedSymbols);
  const stockData = useSelector((state: { stockData: StockDataState }) => state.stockData);
  const { unsubscribeFromSymbolUpdates } = useFinnhubWS();
  const dispatch = useDispatch();

  const [addingNewSymbol, setAddingNewSymbol] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(selectedSymbols[0] || null);
  const [leavingSymbol, setLeavingSymbol] = useState<string | null>(null);
  const [enteringSymbol, setEnteringSymbol] = useState<string | null>(null);

  // detect newly added symbol for enter animation
  useEffect(() => {
    const addedSymbol = selectedSymbols.find(symbol => !prevSymbols.current.includes(symbol));
    if (!addedSymbol) return;
    prevSymbols.current = selectedSymbols;
    setEnteringSymbol(addedSymbol);
    const id = setTimeout(() => setEnteringSymbol(null), ANIMATION_DURATION);
    return () => clearTimeout(id);
  }, [selectedSymbols]);

  const onDelete = useCallback((symbol: string) => {
    dispatch(untrackSymbol(symbol));
    unsubscribeFromSymbolUpdates?.(symbol);

    setSelectedSymbol(null);
    setLeavingSymbol(symbol);
    const id = setTimeout(() => setLeavingSymbol(null), ANIMATION_DURATION);
    return () => clearTimeout(id);
  }, [selectedSymbol, selectedSymbols, leavingSymbol, unsubscribeFromSymbolUpdates]);

  const getLastPrice = (symbol: string) => {
    const data = stockData[symbol];
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
            <StockCard
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
            <StockPriceChart symbol={selectedSymbol} />
          </div>
        )}
      </div>
    </div>
  );
});