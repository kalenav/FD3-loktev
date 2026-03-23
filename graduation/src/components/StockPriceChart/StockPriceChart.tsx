import { memo, useMemo } from "react";
import { MAX_DATA_POINTS_PER_STOCK, STOCK_DATA_THROTTLE_INTERVAL_MS } from "../../constants/constants";
import { useLiveStockData } from "../../hooks/use-live-stock-data";
import { PriceChart } from "./PriceChart/PriceChart";

export const StockPriceChart = memo(({ symbol }: { symbol: string }) => {
  const { [symbol]: liveData } = useLiveStockData([symbol]);
  const fromTimestamp = useMemo(() => liveData[0]?.timestamp, [liveData[0]]);
  const toTimestamp = useMemo(() => fromTimestamp && (fromTimestamp + (MAX_DATA_POINTS_PER_STOCK * 1.25) * STOCK_DATA_THROTTLE_INTERVAL_MS), [fromTimestamp]);

  return <PriceChart
    data={liveData || []}
    fromTimestamp={fromTimestamp}
    toTimestamp={toTimestamp}
  />
});