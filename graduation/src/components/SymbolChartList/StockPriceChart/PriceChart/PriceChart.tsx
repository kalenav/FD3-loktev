import { Chart, Credits, Legend, Series } from "@highcharts/react";
import "highcharts/esm/modules/no-data-to-display.src.js";
import { useMemo } from "react";

export function PriceChart({
  data,
  fromTimestamp = Date.now(),
  toTimestamp = Date.now() + 60000,
  yAxisSoftRange,
  xAxisLabel = 'Time',
  yAxisLabel = 'Price',
}: {
  data: Array<{ timestamp: number; price: number }>,
  fromTimestamp?: number,
  toTimestamp?: number,
  yAxisSoftRange?: { min: number; max: number },
  xAxisLabel?: string,
  yAxisLabel?: string,
}) {
  // zones have to be recalculated every render, since this single component
  // is used by all symbols, and zones are unique for each symbol's data.
  // I considered a hybrid approach where zones would only be fully recalculated
  // when the symbol changed and adjusted in-place if only data changed,
  // but that would require this component to be aware of the active symbol
  // or some other counterintuitive mechanism, which sucks
  const zones = useMemo(() => {
    if (data.length < 2) {
      return [];
    }
    const breakpoints: Array<{ direction: number, value: number }> = [];
    let prevDirection: number;
    data.slice(1).forEach((point, index) => {
      const direction = Math.sign(point.price - data[index].price) || prevDirection || 1;
      (breakpoints.at(-1)?.direction === direction) && breakpoints.pop();
      prevDirection = direction;
      breakpoints.push({ direction, value: point.timestamp });

    });
    return breakpoints.map(breakpoint => ({
      ...breakpoint,
      color: breakpoint.direction === 1 ? "#5a8a5a" : "#8a4a4a",
    }));
  }, [data]);

  return (
    <Chart
      options={{
        time: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        chart: {
          backgroundColor: "transparent",
          borderWidth: 0,
          plotBorderWidth: 0,
          style: {
            fontFamily: "'Inter', system-ui, sans-serif",
          },
        },
        lang: {
          noData: "Waiting for live data...",
        },
        noData: {
          style: {
            color: "#767b8e",
            fontSize: "14px",
            fontWeight: "400",
          },
        },
        xAxis: {
          type: "datetime" as const,
          min: fromTimestamp,
          max: toTimestamp,
          lineColor: "#272b36",
          tickColor: "#272b36",
          labels: {
            format: "{value:%H:%M:%S}",
            rotation: -45,
            style: {
              color: "#767b8e",
              fontSize: "10px",
            },
          },
          title: {
            text: xAxisLabel,
            style: {
              color: "#4a4f60",
            },
          },
        },
        yAxis: {
          softMin: yAxisSoftRange?.min,
          softMax: yAxisSoftRange?.max,
          gridLineColor: "#1e222b",
          labels: {
            style: {
              color: "#767b8e",
            },
          },
          title: {
            text: yAxisLabel,
            style: {
              color: "#4a4f60",
            },
          },
        },
      }}
    >
      <Credits enabled={false} />
      <Legend enabled={false} />
      <Series
        type="spline"
        data={data.map(point => [point.timestamp, point.price])}
        options={{
          name: "Price",
          color: "transparent",
          lineWidth: 2,
          showInLegend: false,
          zoneAxis: "x",
          zones: zones,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
                radius: 3
              }
            }
          },
          states: {
            hover: {
              lineWidthPlus: 0,
            },
          },
        }}
      />
    </Chart>
  )
}