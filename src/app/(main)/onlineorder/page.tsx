"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnlineOrderList from "./components/OnlineOrderList";
import { useFetch } from "@/hooks/api/useFetch";
import { OrderDataResponse } from "@/types/order.type";
import { lazy, Suspense, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const OnlineOrder = () => {
  const [orderDetail, setOrderDetail] = useState<OrderDataResponse>();

  const OnlineOrderDetail = lazy(
    () => import("@/app/(main)/onlineorder/components/OnlineOrderDetail")
  );

  const { data: PendingData, isSuccess } = useFetch(
    ["onlineorders"],
    "/api/online"
  );

  const pending = PendingData?.filter(
    (item: { status: string }) => item.status == "PENDING"
  );
  const completed = PendingData?.filter(
    (item: { status: string }) => item.status == "COMPLETED"
  );

  return (
    <Sheet>
      <div className="w-full flex gap-6 flex-col lg:flex-row">
        <div className="w-[818px] flex flex-col">
          <div className="w-full h-screen">
            <Tabs defaultValue="pending" className="w-full mt-[30px]">
              <TabsList className="flex gap-5 bg-transparent justify-evenly mb-4">
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
                {isSuccess && pending?.length > 0 ? (
                  pending.map((item: OrderDataResponse) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => setOrderDetail(item)}
                        className="cursor-pointer"
                      >
                        <OnlineOrderList
                          id={item.id}
                          timestamp={item.order_date}
                          total_items={item.order_details.length}
                          total_price={item.total}
                          status={item.status}
                          buttonActive={orderDetail?.id == item.id}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center h-[400px]">
                    All online orders have been completed!
                  </div>
                )}
              </TabsContent>
              <TabsContent
                value="completed"
                className="flex flex-col gap-[10px] mt-0"
              >
                {isSuccess && completed.length > 0 ? (
                  completed.map((item: OrderDataResponse) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => setOrderDetail(item)}
                        className="cursor-pointer"
                      >
                        <SheetTrigger className="w-full">
                          <OnlineOrderList
                            id={item.id}
                            timestamp={item.order_date}
                            total_items={item.order_details.length}
                            total_price={item.total}
                            status={item.status}
                            buttonActive={orderDetail?.id == item.id}
                          />
                        </SheetTrigger>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center h-[400px]">
                    No online orders have been completed!
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {orderDetail && (
          <SheetContent className="bg-white">
            <Suspense fallback={<div>Loading component...</div>}>
              <OnlineOrderDetail data={orderDetail} />
            </Suspense>
          </SheetContent>
        )}
      </div>
    </Sheet>
  );
};

export default OnlineOrder;
