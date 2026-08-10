"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QueueCard from "./components/QueueCard";
import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import TrackOrderCard from "./components/TrackOrderCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetTrackOrderQuery } from "@/redux/features/api/ordersApi";
import { TrackOrderResponse } from "@/types/order.type";

export const OrderStatusType = ["PAID", "PREPARING", "READY"];

const BillingPage = () => {
  const { data: orderList } = useGetTrackOrderQuery();

  const trackorder = orderList?.data.filter((item: TrackOrderResponse) =>
    OrderStatusType.includes(item.status),
  );
  const queueorder = orderList?.data.filter((item: TrackOrderResponse) =>
    Boolean(item.table_id || item.table?.table_number),
  );

  console.log(queueorder);

  return (
    <div className="w-full flex flex-col gap-2 justify-between">
      <Tabs
        defaultValue="all"
        className="w-full bg-white p-2 rounded-lg shadow-sm"
      >
        <div className="flex flex-row justify-between items-center w-full border-b border-gray-100">
          <TabsList className="flex gap-5 bg-transparent justify-start h-auto p-0 border-none">
            <TabsTrigger
              value="all"
              className="border border-transparent data-[state=active]:shadow-none data-[state=active]:border-hijaugelap data-[state=active]:bg-white data-[state=active]:text-hijaugelap rounded-full text-gray-500 px-10 py-2 text-sm transition-all bg-gray-100"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="border border-transparent data-[state=active]:shadow-none data-[state=active]:border-hijaugelap data-[state=active]:bg-white data-[state=active]:text-hijaugelap rounded-full text-gray-500 px-10 py-2 text-sm transition-all bg-gray-100"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="closed"
              className="border border-transparent data-[state=active]:shadow-none data-[state=active]:border-hijaugelap data-[state=active]:bg-white data-[state=active]:text-hijaugelap rounded-full text-gray-500 px-10 py-2 text-sm transition-all bg-gray-100"
            >
              Closed
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 h-fit">
            <div className="px-4 py-2 text-hijaugelap bg-hijaugelap/20 rounded-full text-sm font-semibold">
              {queueorder?.length} Active Queue
            </div>
            <Button className="rounded-full" size={"icon"}>
              <EllipsisIcon size={16} />
            </Button>
          </div>
        </div>

        <ScrollArea
          type="always"
          className="h-[calc(100vh-400px)] pr-2 scroll-smooth border-b border-gray-100"
        >
          <TabsContent
            value="all"
            className="w-full data-[state=inactive]:hidden flex flex-col gap-2"
          >
            {queueorder?.map((item: TrackOrderResponse) => {
              return (
                <div key={item.id}>
                  <QueueCard order={item} />
                </div>
              );
            })}
          </TabsContent>
          <TabsContent
            value="active"
            className="w-full data-[state=inactive]:hidden flex flex-col gap-2"
          >
            {queueorder
              ?.filter((item) => item.table?.is_active == true)
              .map((item: TrackOrderResponse) => {
                return (
                  <div key={item.id}>
                    <QueueCard order={item} />
                  </div>
                );
              })}
          </TabsContent>
          <TabsContent
            value="closed"
            className="w-full data-[state=inactive]:hidden flex flex-col gap-2"
          >
            {queueorder
              ?.filter((item) => item.table?.is_active == false)
              .map((item: TrackOrderResponse) => {
                return (
                  <div key={item.id}>
                    <QueueCard order={item} />
                  </div>
                );
              })}
          </TabsContent>
        </ScrollArea>
      </Tabs>
      <div className="flex flex-col gap-2 w-full ">
        <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm">
          <div className="font-semibold">Track Order</div>
          <div className="flex gap-2">
            <Input type="text"></Input>
            <div className="flex gap-2">
              <Button
                size={"icon"}
                variant={"outline"}
                className="rounded-full border-hijaugelap text-hijaugelap"
                disabled
              >
                <span>◀</span>
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                className="rounded-full border-hijaugelap text-hijaugelap"
              >
                <span>▶</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-white rounded-lg shadow-sm justify-items-center">
          {trackorder?.map((item: TrackOrderResponse) => {
            return (
              <div key={item.id}>
                <TrackOrderCard order={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
