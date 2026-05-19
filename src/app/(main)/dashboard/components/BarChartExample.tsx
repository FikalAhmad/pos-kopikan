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

interface SalesDataItem {
  name: string;
  sellingProduct: number;
}

interface ProductSalesChartProps {
  label: string;
  data: SalesDataItem[];
  type: "week" | "month" | "year";
}

const TYPE_LABELS: Record<ProductSalesChartProps["type"], string> = {
  week: "this week",
  month: "this month",
  year: "this year",
};

function generateGradient(length: number): string[] {
  const baseHue = 105;
  return Array.from({ length }, (_, i) => {
    const ratio = i / Math.max(length - 1, 1);
    const lightness = 42 - ratio * 25;
    const saturation = 58 + ratio * 17;
    return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
  });
}

export const ProductSalesChart = ({
  label,
  data,
  type,
}: ProductSalesChartProps) => {
  const chartData =
    data?.map(({ name, sellingProduct }) => ({ name, sellingProduct })) ?? [];

  const colors = generateGradient(chartData.length);

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
          Showing total selling for {TYPE_LABELS[type]}
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
              <Bar dataKey="sellingProduct" radius={8}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
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
          <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
            Belum ada data penjualan
          </div>
        )}
      </CardContent>
    </Card>
  );
};
