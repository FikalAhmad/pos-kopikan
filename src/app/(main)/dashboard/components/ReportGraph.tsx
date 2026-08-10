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
import { useFetch } from "@/hooks/api/useFetch";

type MetricType =
  | "totalsalesamount"
  | "totalproductsales"
  | "totalcustomer"
  | "netprofit";

type ChartResponse = {
  filter: string;
  labels: string[];
  datasets: number[];
};

const ReportGraph = ({ period }: { period: string }) => {
  const [selectedMetric, setSelectedMetric] =
    useState<MetricType>("totalsalesamount");

  const { data: rawChartData } = useFetch<ChartResponse>(
    ["dashboard-chart", selectedMetric, period ?? ""],
    `/api/dashboard/chart?filter=${selectedMetric}&period=${period ?? ""}`,
  );

  const formattedChartData =
    rawChartData?.labels?.map((label, index) => ({
      label,
      value: rawChartData.datasets[index] ?? 0,
    })) ?? [];

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
            <SelectItem value="totalsalesamount" className="text-xs">
              Total Sales Amount
            </SelectItem>
            <SelectItem value="totalproductsales" className="text-xs">
              Total Product Sales
            </SelectItem>
            <SelectItem value="totalcustomer" className="text-xs">
              Total Customer
            </SelectItem>
            <SelectItem value="netprofit" className="text-xs">
              Net Profit
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-[300px] md:h-[350px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedChartData}
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
              dataKey="label"
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
              dataKey="value"
              stroke="#1e3e2b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorActual)"
              isAnimationActive={true}
              animationBegin={200}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportGraph;
