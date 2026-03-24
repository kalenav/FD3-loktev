import { memo, useMemo } from "react";
import { PRICE_CHART_LEFT_BUFFER_S, PRICE_CHART_RIGHT_BUFFER_S } from "../../../constants/constants";
import { useLiveStockData } from "../../../hooks/use-live-stock-data";
import { PriceChart } from "./PriceChart/PriceChart";

export const StockPriceChart = memo(({ symbol }: { symbol: string }) => {
  const { [symbol]: liveData } = useLiveStockData([symbol]);
  const leftBuffer = useMemo(() => PRICE_CHART_LEFT_BUFFER_S * 1000, []);
  const rightBuffer = useMemo(() => PRICE_CHART_RIGHT_BUFFER_S * 1000, []);
  const yAxisSoftRange = useMemo(() => {
    if (liveData.length === 0) {
      return;
    }
    // three orders of magnitute less
    const radius = Math.pow(10, Math.floor(Math.log10(liveData[0].price)) - 3);
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