"use client";

import SettingIcon from "@/public/assets/images/settings.svg";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChartExample } from "./BarChartExample";
import { axiosJWT } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const StatisticDashboard = () => {
  const [filterStat, setFilterStat] = useState<string>("7d");

  const dataProductSales = useMutation({
    mutationFn: (data: { period: string }) => {
      return axiosJWT.post("/api/products/filter", data);
    },
  });

  useEffect(() => {
    dataProductSales.mutate({ period: filterStat });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStat]);

  const response = dataProductSales.data?.data.data[0];

  const signatureData = response?.signature ?? [];
  const coffeeData = response?.coffee ?? [];
  const nonCoffeeData = response?.noncoffee ?? [];

  return (
    <div className="flex flex-col py-[34px] px-[10px] gap-7 w-auto lg:w-[309px] bg-white h-screen shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl">
          <strong>Overall</strong> Statistics
        </div>
        <Image src={SettingIcon} alt="Setting Icon" />
      </div>
      <Tabs defaultValue="week" className="w-auto">
        <TabsList className="flex justify-between bg-transparent mb-[30px]">
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
        <ScrollArea className="h-[75vh]">
          <TabsContent value="week" className="flex flex-col gap-[30px]">
            <div>
              <BarChartExample
                data={signatureData}
                label="Signature"
                type="week"
              />
            </div>
            <div>
              <BarChartExample data={coffeeData} label="Coffee" type="week" />
            </div>
            <div>
              <BarChartExample
                data={nonCoffeeData}
                label="Non Coffee"
                type="week"
              />
            </div>
          </TabsContent>
          <TabsContent value="month" className="flex flex-col gap-[30px]">
            <div>
              <BarChartExample
                data={signatureData}
                label="Signature"
                type="month"
              />
            </div>
            <div>
              <BarChartExample data={coffeeData} label="Coffee" type="month" />
            </div>
            <div>
              <BarChartExample
                data={nonCoffeeData}
                label="Non Coffee"
                type="month"
              />
            </div>
          </TabsContent>
          <TabsContent value="year" className="flex flex-col gap-[30px]">
            <div>
              <BarChartExample
                data={signatureData}
                label="Signature"
                type="year"
              />
            </div>
            <div>
              <BarChartExample data={coffeeData} label="Coffee" type="year" />
            </div>
            <div>
              <BarChartExample
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
