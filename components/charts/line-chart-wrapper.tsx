"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LineChartWrapperProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  name?: string;
}

export function LineChartWrapper({ data, dataKey, xAxisKey, name }: LineChartWrapperProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          name={name || dataKey}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
