"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductSalesChart } from "./BarChartExample";
import { axiosJWT } from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const StatisticDashboard = () => {
  const [filterStat, setFilterStat] = useState<string>("7d");

  const { data: response } = useQuery({
    queryKey: ["productSales", filterStat],
    queryFn: () =>
      axiosJWT.post("/api/products/filter", { period: filterStat }),
    select: (res) => res.data?.data?.[0],
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });

  const signatureData = response?.signature ?? [];
  const coffeeData = response?.coffee ?? [];
  const nonCoffeeData = response?.noncoffee ?? [];

  return (
    <div className="flex flex-col py-6 px-[10px] gap-7 w-auto lg:w-[309px] bg-white h-full shadow-md overflow-hidden">
      <div className="text-xl">
        <strong>Overall</strong> Statistics
      </div>

      <Tabs defaultValue="week" className="w-auto flex-1 flex flex-col h-0">
        <TabsList className="shrink-0 flex justify-between bg-transparent mb-[30px]">
          <TabsTrigger
            value="week"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-hijau"
            onClick={() => setFilterStat("7d")}
          >
            This week
          </TabsTrigger>
          <TabsTrigger
            value="month"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-hijau"
            onClick={() => setFilterStat("1m")}
          >
            This month
          </TabsTrigger>
          <TabsTrigger
            value="year"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-hijau"
            onClick={() => setFilterStat("1y")}
          >
            This year
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1 overflow-y-auto">
          <TabsContent value="week" className="flex flex-col gap-[30px] m-0">
            <div>
              <ProductSalesChart
                data={signatureData}
                label="Signature"
                type="week"
              />
            </div>
            <div>
              <ProductSalesChart data={coffeeData} label="Coffee" type="week" />
            </div>
            <div>
              <ProductSalesChart
                data={nonCoffeeData}
                label="Non Coffee"
                type="week"
              />
            </div>
          </TabsContent>
          <TabsContent value="month" className="flex flex-col gap-[30px] m-0">
            <div>
              <ProductSalesChart
                data={signatureData}
                label="Signature"
                type="month"
              />
            </div>
            <div>
              <ProductSalesChart
                data={coffeeData}
                label="Coffee"
                type="month"
              />
            </div>
            <div>
              <ProductSalesChart
                data={nonCoffeeData}
                label="Non Coffee"
                type="month"
              />
            </div>
          </TabsContent>
          <TabsContent value="year" className="flex flex-col gap-[30px] m-0">
            <div>
              <ProductSalesChart
                data={signatureData}
                label="Signature"
                type="year"
              />
            </div>
            <div>
              <ProductSalesChart data={coffeeData} label="Coffee" type="year" />
            </div>
            <div>
              <ProductSalesChart
                data={nonCoffeeData}
                label="Non Coffee"
                type="year"
              />
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default StatisticDashboard;
