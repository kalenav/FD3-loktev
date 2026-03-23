import { Chart, Series, XAxis, YAxis } from "@highcharts/react";
import { useMemo } from "react";
import './StockChart.scss';

export function StockChart({ data }: { data: Array<{ timestamp: number; price: number }> }) {
  const zoneBreakpoints = useMemo(() => {
    if (data.length < 2) {
      return [];
    }
    const breakpoints: Array<{ direction: number, value: number }> = [];
    data.slice(1).forEach((point, index) => {
      const direction = Math.sign(point.price - data[index].price);
      (breakpoints.at(-1)?.direction === direction) && breakpoints.pop();
      breakpoints.push({ direction, value: point.timestamp });
    });
    return breakpoints.map(breakpoint => {
      let color;
      switch (breakpoint.direction) {
        case 1:
          color = "green";
          break;
        case -1:
          color = "red";
          break;
        default:
          color = "grey";
      }
      return { ...breakpoint, color };
    });
  }, [data]);

  return (
    <Chart>
      <XAxis type="datetime" />
      <YAxis />
      <Series
        type="line"
        data={data.map(point => [point.timestamp, point.price])}
        options={{
          color: "transparent",
          zoneAxis: "x",
          zones: zoneBreakpoints
        }}
      />
    </Chart>
  )
}