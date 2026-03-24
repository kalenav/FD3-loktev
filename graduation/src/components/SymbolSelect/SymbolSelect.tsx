import { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_CURRENCIES, QUOTE_CURRENCIES } from "../../constants/constants";
import { useFinnhubWS } from "../../contexts/finnhub-ws.context";
import { trackSymbol } from "../../redux/selected-symbols.slice";
import './SymbolSelect.scss';

export const SymbolSelect = memo(({
  baseCurrencies = BASE_CURRENCIES,
  quoteCurrencies = QUOTE_CURRENCIES,
  onSelect,
  onCancel,
}: {
  baseCurrencies?: Array<string>,
  quoteCurrencies?: Array<string>,
  onSelect?: () => void,
  onCancel?: () => void,
}) => {
  const [baseAsset, setBaseAsset] = useState(baseCurrencies[0]);
  const [quoteAsset, setQuoteAsset] = useState(quoteCurrencies[0]);
  const dispatch = useDispatch();
  const { subscribeToSymbolUpdates } = useFinnhubWS();

  const onConfirm = useCallback(() => {
    const fullSymbol = `BINANCE:${baseAsset}${quoteAsset}`;
    dispatch(trackSymbol(fullSymbol));
    subscribeToSymbolUpdates(fullSymbol);
    onSelect?.();
  }, [baseAsset, quoteAsset]);

  return <div className="symbol-select">
    <div className="select-row">
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
    </div>
    <div className="select-row">
      <button className="btn-confirm" onClick={onConfirm}>Confirm</button>
      {onCancel && <button className="btn-cancel" onClick={onCancel}>Cancel</button>}
    </div>
  </div>;
});