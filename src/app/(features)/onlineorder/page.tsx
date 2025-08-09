"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Clock from "../dashboard/components/Clock";
import OnlineOrderList from "./components/OnlineOrderList";
import OnlineOrderDetail from "./components/OnlineOrderDetail";
import { useFetch } from "@/hooks/api/useFetch";
import { OrderDataResponse } from "@/types/order.type";
import { useState } from "react";

const OnlineOrder = () => {
  const [orderDetail, setOrderDetail] = useState<OrderDataResponse>();

  const { data: PendingData, isSuccess: PendingDataSuccess } = useFetch(
    ["onlineorders"],
    "/api/online"
  );

  // console.log(PendingData?.filter((item) => item.status == "completed"));

  return (
    <div className="w-full flex gap-6 flex-col lg:flex-row">
      <div className="w-[509px] flex flex-col gap-[30px]">
        <div className="text-[16px]">
          <Clock />
        </div>
        <div className="">
          <Tabs defaultValue="pending" className="w-auto mt-[30px]">
            <TabsList className="flex gap-5 bg-transparent justify-start mb-4">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-black data-[state=active]:text-black rounded-none text-black font-bold"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-black data-[state=active]:text-black rounded-none text-black font-bold"
              >
                Completed
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="flex flex-col gap-[10px]">
              {PendingDataSuccess ? (
                PendingData.filter(
                  (item: { status: string }) => item.status == "pending"
                ).map((item: OrderDataResponse) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setOrderDetail(item)}
                      className="cursor-pointer"
                    >
                      <OnlineOrderList
                        id={item.id}
                        timestamp={item.order_date}
                        total_items={item.order_details.reduce(
                          (acc, curr) => acc + curr.qty,
                          0
                        )}
                        total_price={item.total}
                        status={item.status}
                        buttonActive={orderDetail?.id == item.id}
                      />
                    </div>
                  );
                })
              ) : (
                <div>Loading...</div>
              )}
            </TabsContent>
            <TabsContent
              value="completed"
              className="flex flex-col gap-[10px] mt-0"
            >
              {PendingDataSuccess ? (
                PendingData.filter(
                  (item: { status: string }) => item.status == "completed"
                ).map((item: OrderDataResponse) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setOrderDetail(item)}
                      className="cursor-pointer"
                    >
                      <OnlineOrderList
                        id={item.id}
                        timestamp={item.order_date}
                        total_items={item.order_details.reduce(
                          (acc, curr) => acc + curr.qty,
                          0
                        )}
                        total_price={item.total}
                        status={item.status}
                        buttonActive={orderDetail?.id == item.id}
                      />
                    </div>
                  );
                })
              ) : (
                <div>Loading...</div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {orderDetail ? (
        <OnlineOrderDetail data={orderDetail} />
      ) : (
        <div className="flex flex-col py-[34px] px-[10px] gap-5 w-[309px] bg-white h-screen shadow-md"></div>
      )}
    </div>
  );
};

export default OnlineOrder;
