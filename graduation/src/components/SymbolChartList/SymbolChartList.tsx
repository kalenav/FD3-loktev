import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { SymbolSelect } from "../SymbolSelect/SymbolSelect";
import { StockPriceChart } from "./StockPriceChart/StockPriceChart";
import './SymbolChartList.scss';

export const SymbolChartList = memo(() => {
  const selectedSymbols = useSelector((state: { selectedSymbols: Array<string> }) => state.selectedSymbols);
  const [addingNewSymbol, setAddingNewSymbol] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(selectedSymbols[0] || null);

  return <div className="symbol-chart-list">
    <div className="add-new-symbol-container">
      {addingNewSymbol
        ? <SymbolSelect onSelect={() => setAddingNewSymbol(false)} />
        : <button onClick={() => setAddingNewSymbol(true)}>Add new symbol</button>}
    </div>
    <div className="symbols-container">
      {selectedSymbols.map(symbol => (
        <div key={symbol} onClick={() => setSelectedSymbol(symbol)}>
          <h2>{symbol}</h2>
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