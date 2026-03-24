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
      color: breakpoint.direction === 1 ? "green" : "red",
    }));
  }, [data]);

  return (
    <Chart
      options={{
        time: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        chart: {
          backgroundColor: "#10151f",
        },
        lang: {
          noData: "Waiting for live data...",
        },
        noData: {
          style: {
            color: "white",
            fontSize: "16px",
            fontWeight: "normal",
          },
        },
        xAxis: {
          type: "datetime" as const,
          min: fromTimestamp,
          max: toTimestamp,
          labels: {
            format: "{value:%H:%M:%S}",
            rotation: -45,
            style: {
              color: "white",
              fontSize: "10px",
            },
          },
          title: {
            text: xAxisLabel,
            style: {
              color: "white",
            },
          },
        },
        yAxis: {
          softMin: yAxisSoftRange?.min,
          softMax: yAxisSoftRange?.max,
          labels: {
            style: {
              color: "white",
            },
          },
          title: {
            text: yAxisLabel,
            style: {
              color: "white",
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
          lineWidth: 3,
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