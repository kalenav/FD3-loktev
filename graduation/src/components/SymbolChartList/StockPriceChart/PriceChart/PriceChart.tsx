import { Chart, Credits, Legend, Series } from "@highcharts/react";
import "highcharts/esm/modules/no-data-to-display.src.js";
import { useEffect, useRef } from "react";

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
  const zones = useRef<Array<{ value: number; color: string, direction: number }>>([]);
  useEffect(() => {
    if (data.length < 2) {
      return;
    }
    (data[0].timestamp > zones.current[0]?.value) && zones.current.shift();
    const lastZoneDirection = zones.current.at(-1)?.direction;
    const currDirection = Math.sign(data.at(-1)!.price - data.at(-2)!.price) || lastZoneDirection || 1;
    (currDirection === lastZoneDirection) && zones.current.pop();
    zones.current.push({
      value: data.at(-1)!.timestamp,
      color: currDirection === 1 ? "green" : "red",
      direction: currDirection
    });
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
          zones: zones.current,
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