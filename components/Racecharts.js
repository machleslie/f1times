"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import TimeTable from "./timestable";
import { useQuery } from "@tanstack/react-query";
import { getDriversLapTimes } from "@/lib/driversStatus";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

const lap = [];

const Racecharts = ({selectedSession, driver_number}) => {
  const { data } = useQuery({
    queryKey: [driver_number, selectedSession],
    queryFn: () => getDriversLapTimes(selectedSession, driver_number),
    refetchOnWindowFocus: false,
    enabled: !!driver_number && !!selectedSession,
  });
  console.log("Lap data:", data);
  console.log("Session Key:", selectedSession);
  console.log("Driver Number:", driver_number);

  return (
    <div className="racecharts-container border border-white  w-2/4 mx-10 text-white p-4 rounded-lg">
      <div className="">
        {!data ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className={"h-96 rounded-2xl"}>
            <LineChart data={data}>
              <XAxis dataKey="lap_number" />
              <YAxis
                tickFormatter={(value) => `${value.toFixed(1)}s`}
                domain={[(dataMin) => dataMin - 10, (dataMax) => dataMax + 10]} reversed
              />
              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
              <CartesianGrid vertical={false} horizontal={false} />
              {/* {data.map((lap, index) => ( */}
                <Line
                  key={data.lap_number}
                  type="monotone"
                  dataKey="lap_duration"
                  stroke="#8884d8"
                  dot={false}
                />
              {/* ))} */}
            </LineChart>
          </ChartContainer>
        )}
      </div>
      <div className="">
        <TimeTable laptime={data} />
      </div>
    </div>
  );
};

export default Racecharts;
