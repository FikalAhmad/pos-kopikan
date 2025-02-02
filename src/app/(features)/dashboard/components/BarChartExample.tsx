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
  name: { name: string }[];
  sellingProduct: { sellingProduct: number }[];
}

export const BarChartExample = ({
  label,
  name,
  sellingProduct,
}: DataSellingWeek) => {
  const chartData = name.map((item, index) => ({
    name: item.name,
    sellingProduct: sellingProduct[index].sellingProduct,
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
          Showing total selling for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 7)}
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
      </CardContent>
    </Card>
  );
};
