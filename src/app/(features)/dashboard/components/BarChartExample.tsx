"use client";

import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DataSellingWeek {
  label: string;
  data: {
    name: string;
    sellingProduct: number;
  }[];
  type: string;
}

export const BarChartExample = ({ label, data, type }: DataSellingWeek) => {
  const chartData = data.map((item) => ({
    name: item.name,
    sellingProduct: item.sellingProduct,
  }));
  const colors = [
    "#4EA824",
    "#44911f",
    "#3E871D",
    "#367619",
    "#2F6515",
    "#275412",
    "#1F430E",
    "#17320B",
    "#102207",
    "#081104",
  ];

  const chartConfig = {
    sellingProduct: {
      label,
      color: "var(--darkgreen)",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>
          Showing total selling for the last {type}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideIndicator />}
              />
              <Bar
                dataKey="sellingProduct"
                fill="var(--color-sellingProduct)"
                radius={8}
              >
                {colors.map((color, index) => (
                  <Cell key={`color-${index}`} fill={color} />
                ))}
                <LabelList
                  position="insideTop"
                  offset={10}
                  className="fill-white font-bold"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="text-xs text-red-600">Belum ada data penjualan</div>
        )}
      </CardContent>
    </Card>
  );
};
