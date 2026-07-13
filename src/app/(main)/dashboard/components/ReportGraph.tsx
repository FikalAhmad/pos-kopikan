"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MetricType =
  | "total-sales-amount"
  | "total-product-sales"
  | "total-customer"
  | "net-profit";

const graphData: Record<
  MetricType,
  Array<{ name: string; actual: number; target: number }>
> = {
  "total-sales-amount": [
    { name: "Mon", actual: 1200, target: 1000 },
    { name: "Tue", actual: 1500, target: 1100 },
    { name: "Wed", actual: 900, target: 1200 },
    { name: "Thu", actual: 1800, target: 1300 },
    { name: "Fri", actual: 2200, target: 1400 },
    { name: "Sat", actual: 2600, target: 1500 },
    { name: "Sun", actual: 2000, target: 1600 },
  ],
  "total-product-sales": [
    { name: "Mon", actual: 120, target: 100 },
    { name: "Tue", actual: 150, target: 110 },
    { name: "Wed", actual: 90, target: 120 },
    { name: "Thu", actual: 180, target: 130 },
    { name: "Fri", actual: 220, target: 140 },
    { name: "Sat", actual: 260, target: 150 },
    { name: "Sun", actual: 200, target: 160 },
  ],
  "total-customer": [
    { name: "Mon", actual: 50, target: 45 },
    { name: "Tue", actual: 65, target: 50 },
    { name: "Wed", actual: 40, target: 55 },
    { name: "Thu", actual: 80, target: 60 },
    { name: "Fri", actual: 95, target: 65 },
    { name: "Sat", actual: 110, target: 70 },
    { name: "Sun", actual: 85, target: 75 },
  ],
  "net-profit": [
    { name: "Mon", actual: 400, target: 350 },
    { name: "Tue", actual: 500, target: 380 },
    { name: "Wed", actual: 300, target: 400 },
    { name: "Thu", actual: 600, target: 420 },
    { name: "Fri", actual: 750, target: 450 },
    { name: "Sat", actual: 900, target: 480 },
    { name: "Sun", actual: 700, target: 500 },
  ],
};

const ReportGraph = () => {
  const [selectedMetric, setSelectedMetric] =
    useState<MetricType>("total-sales-amount");

  const data = graphData[selectedMetric];

  return (
    <div className="flex flex-col gap-4 px-4 py-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl flex items-center gap-2 text-gray-800">
          <span className="bg-hijaugelap w-1.5 h-1.5 rounded-full" />
          Report Graph
        </h1>
        <Select
          value={selectedMetric}
          onValueChange={(val) => setSelectedMetric(val as MetricType)}
        >
          <SelectTrigger className="w-48 h-9 rounded-full text-xs font-medium border-gray-200">
            <SelectValue placeholder="Total Sales Amount" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="total-sales-amount" className="text-xs">
              Total Sales Amount
            </SelectItem>
            <SelectItem value="total-product-sales" className="text-xs">
              Total Product Sales
            </SelectItem>
            <SelectItem value="total-customer" className="text-xs">
              Total Customer
            </SelectItem>
            <SelectItem value="net-profit" className="text-xs">
              Net Profit
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-[300px] md:h-[350px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3e2b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#1e3e2b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              dy={10}
              style={{ fontSize: "12px", fill: "#888888" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              dx={-5}
              style={{ fontSize: "12px", fill: "#888888" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#1e3e2b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorActual)"
              isAnimationActive={true}
              animationBegin={200}
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#82ca9d"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorTarget)"
              isAnimationActive={true}
              animationBegin={400}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportGraph;
