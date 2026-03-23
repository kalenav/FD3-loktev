import { Chart, Credits, Legend, Series } from "@highcharts/react";
import { useMemo } from "react";

export function PriceChart({
  data,
  fromTimestamp = Date.now(),
  toTimestamp = Date.now() + 60000,
  xAxisLabel = 'Time',
  yAxisLabel = 'Price',
}: {
  data: Array<{ timestamp: number; price: number }>,
  fromTimestamp?: number,
  toTimestamp?: number,
  xAxisLabel?: string,
  yAxisLabel?: string,
}) {
  const zoneBreakpoints = useMemo(() => {
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

  const yAxisSoftRange = useMemo(() => {
    if (data.length === 0) {
      return {};
    }
    // two orders of magnitude less
    const radius = Math.pow(10, Math.floor(Math.log10(data[0].price)) - 2);
    return {
      min: data[0].price - radius,
      max: data[0].price + radius,
    }
  }, [data[0]]);

  return (
    <Chart
      options={{
        chart: {
          backgroundColor: "#10151f",
        },
        xAxis: {
          type: "datetime",
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
          softMin: yAxisSoftRange.min,
          softMax: yAxisSoftRange.max,
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
          color: "transparent",
          lineWidth: 5,
          showInLegend: false,
          zoneAxis: "x",
          zones: zoneBreakpoints,
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