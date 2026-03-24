import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { SymbolSelect } from "../SymbolSelect/SymbolSelect";
import { StockPriceChart } from "./StockPriceChart/StockPriceChart";

export const SymbolChartList = memo(() => {
  const selectedSymbols = useSelector((state: { selectedSymbols: Array<string> }) => state.selectedSymbols);
  const [addingNewSymbol, setAddingNewSymbol] = useState(false);

  return <div>
    {addingNewSymbol
      ? <SymbolSelect onSelect={() => setAddingNewSymbol(false)} />
      : <button onClick={() => setAddingNewSymbol(true)}>Add new symbol</button>}
    {selectedSymbols.map(symbol => <div key={symbol}>
      <h2>{symbol}</h2>
      <StockPriceChart symbol={symbol} />
    </div>)}
  </div>
});