import { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_CURRENCIES, QUOTE_CURRENCIES } from "../../constants/constants";
import { useFinnhubWS } from "../../contexts/finnhub-ws.context";
import { addSymbol } from "../../redux/selected-symbols.slice";

export const SymbolSelect = memo(({
  baseCurrencies = BASE_CURRENCIES,
  quoteCurrencies = QUOTE_CURRENCIES,
}: {
  baseCurrencies?: Array<string>,
  quoteCurrencies?: Array<string>,
}) => {
  const [baseAsset, setBaseAsset] = useState(baseCurrencies[0]);
  const [quoteAsset, setQuoteAsset] = useState(quoteCurrencies[0]);
  const dispatch = useDispatch();
  const { subscribeToSymbolUpdates } = useFinnhubWS();

  const onConfirm = useCallback(() => {
    const fullSymbol = `BINANCE:${baseAsset}${quoteAsset}`;
    dispatch(addSymbol(fullSymbol));
    subscribeToSymbolUpdates(fullSymbol);
  }, [baseAsset, quoteAsset]);

  return <div>
    <select value={baseAsset} onChange={e => setBaseAsset(e.target.value)}>
      {baseCurrencies.map((symbol) => (
        <option key={symbol} value={symbol}>
          {symbol}
        </option>
      ))}
    </select>
    <select value={quoteAsset} onChange={e => setQuoteAsset(e.target.value)}>
      {quoteCurrencies.filter(quote => quote !== baseAsset).map((symbol) => (
        <option key={symbol} value={symbol}>
          {symbol}
        </option>
      ))}
    </select>
    <button onClick={onConfirm}>Confirm</button>
  </div>;
});