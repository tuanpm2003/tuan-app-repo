"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BarChartWrapperProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  name?: string;
}

export function BarChartWrapper({ data, dataKey, xAxisKey, name }: BarChartWrapperProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill="hsl(var(--primary))" name={name || dataKey} />
      </BarChart>
    </ResponsiveContainer>
  );
}
