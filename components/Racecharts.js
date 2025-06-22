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
} from "@/components/ui/chart"
import TimeTable from "./timestable";



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
    
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
}


const lap = [];

const Racecharts = () => {
  const [laptime, setLapTime] = useState([
    { lap_number: 1, driver_number: 44, lap_duration: 90 },
  ]);

  useEffect(() => {
    fetch("https://api.openf1.org/v1/laps?session_key=9971&driver_number=63")
      .then((response) => response.json())
      .then((data) => {
        setLapTime(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="racecharts-container border border-white  w-2/4 mx-10 text-white p-4 rounded-lg">
      <div className="">
        <ChartContainer config={chartConfig} className={'h-96 rounded-2xl'}>
          <LineChart data={laptime}>
            <XAxis dataKey="lap_number" />
            <YAxis
              tickFormatter={(value) => `${value.toFixed(1)}s`}
              domain={[(dataMin) => dataMin - 10, (dataMax) => dataMax + 10]}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <CartesianGrid vertical={false} horizontal={false} />
            <Line type="monotone" dataKey="lap_duration" stroke="#8884d8" dot={false} />
          </LineChart>
        </ChartContainer>
      </div>
      <div className="">
        <TimeTable laptime={laptime} />
      </div>
      
    </div>
  );
};

export default Racecharts;
