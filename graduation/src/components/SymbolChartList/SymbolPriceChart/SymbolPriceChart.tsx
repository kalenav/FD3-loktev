import { memo, useMemo } from "react";
import { MAX_DATA_POINTS_PER_SYMBOL, PRICE_CHART_RIGHT_BUFFER_S, SYMBOL_DATA_THROTTLE_INTERVAL_MS } from "../../../constants/constants";
import { useLiveSymbolData } from "../../../hooks/use-live-symbol-data";
import { PriceChart } from "./PriceChart/PriceChart";

export const SymbolPriceChart = memo(({ symbol }: { symbol: string }) => {
  const { [symbol]: liveData } = useLiveSymbolData([symbol]);
  const leftBuffer = useMemo(() => MAX_DATA_POINTS_PER_SYMBOL * SYMBOL_DATA_THROTTLE_INTERVAL_MS, []);
  const rightBuffer = useMemo(() => PRICE_CHART_RIGHT_BUFFER_S * 1000, []);
  const yAxisSoftRange = useMemo(() => {
    if (liveData.length === 0) {
      return;
    }
    // four orders of magnitute less
    const radius = Math.pow(10, Math.floor(Math.log10(liveData[0].price)) - 4);
    return {
      min: liveData[0].price - radius,
      max: liveData[0].price + radius,
    }
  }, [liveData.length > 0]); // this will only change after the very first data point arrives
  
  return <PriceChart
    data={liveData}
    fromTimestamp={Date.now() - leftBuffer}
    toTimestamp={Date.now() + rightBuffer}
    yAxisSoftRange={yAxisSoftRange}
  />
});