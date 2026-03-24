import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFinnhubWS } from "../../contexts/finnhub-ws.context";
import { untrackSymbol } from "../../redux/selected-symbols.slice";
import { SymbolSelect } from "../SymbolSelect/SymbolSelect";
import { StockPriceChart } from "./StockPriceChart/StockPriceChart";
import './SymbolChartList.scss';

export const SymbolChartList = memo(() => {
  const selectedSymbols = useSelector((state: { selectedSymbols: Array<string> }) => state.selectedSymbols);
  const { unsubscribeFromSymbolUpdates } = useFinnhubWS();
  const dispatch = useDispatch();

  const [addingNewSymbol, setAddingNewSymbol] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(selectedSymbols[0] || null);

  return <div className="symbol-chart-list">
    <div className="add-new-symbol-container">
      {addingNewSymbol
        ? <SymbolSelect onSelect={() => setAddingNewSymbol(false)} />
        : <button onClick={() => setAddingNewSymbol(true)}>Track new symbol</button>}
    </div>
    <div className="symbols-container">
      {selectedSymbols.map(symbol => (
        <div key={symbol} onClick={() => setSelectedSymbol(symbol)}>
          <h2>{symbol}</h2>
          <button onClick={() => {
            dispatch(untrackSymbol(symbol));
            unsubscribeFromSymbolUpdates?.(symbol);
          }}>Stop tracking</button>
        </div>
      ))}
    </div>
    {selectedSymbol && (
      <div className="chart-container">
        <StockPriceChart symbol={selectedSymbol} />
      </div>
    )}
  </div>
});