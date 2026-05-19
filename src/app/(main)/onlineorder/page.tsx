"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnlineOrderList from "./components/OnlineOrderList";
import { useFetch } from "@/hooks/api/useFetch";
import { OrderDataResponse } from "@/types/order.type";
import { lazy, Suspense, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CheckCircle, Clock, Loader2 } from "lucide-react";

const OnlineOrderDetail = lazy(
  () => import("@/app/(main)/onlineorder/components/OnlineOrderDetail"),
);

const OnlineOrder = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const {
    data: PendingData,
    isSuccess,
    isLoading,
  } = useFetch<OrderDataResponse[]>(["onlineorders"], "/api/online");

  const orderDetail = PendingData?.find((item) => item.id === selectedOrderId);

  const pending =
    PendingData?.filter((item) => item.status === "PENDING") || [];

  const completed =
    PendingData?.filter((item) => item.status === "COMPLETED") || [];

  return (
    <Sheet
      open={!!selectedOrderId}
      onOpenChange={(open) => !open && setSelectedOrderId(null)}
    >
      <div className="w-full flex gap-6 flex-col lg:flex-row min-h-screen p-4 md:p-6 bg-slate-50/50">
        {/* Menggunakan kelas responsif w-full lg:max-w-[818px] untuk menghindari layout pecah */}
        <div className="w-full lg:max-w-[818px] flex flex-col">
          <div className="w-full">
            <Tabs defaultValue="pending" className="w-full mt-[10px]">
              <TabsList className="flex gap-5 bg-transparent justify-evenly mb-6 border-b border-gray-100 pb-px">
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-hijaugelap data-[state=active]:text-hijaugelap rounded-none text-gray-500 font-bold px-8 pb-3 transition-all"
                >
                  Pending ({pending.length})
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-hijaugelap data-[state=active]:text-hijaugelap rounded-none text-gray-500 font-bold px-8 pb-3 transition-all"
                >
                  Completed ({completed.length})
                </TabsTrigger>
              </TabsList>
              {/* Tampilkan loading spinner jika sedang fetching data */}
              {isLoading ? (
                <div className="flex flex-col justify-center items-center h-[400px] gap-3">
                  <Loader2 className="h-10 w-10 animate-spin text-hijaugelap" />
                  <p className="text-sm text-muted-foreground animate-pulse">
                    Memuat pesanan...
                  </p>
                </div>
              ) : (
                <>
                  <TabsContent
                    value="pending"
                    className="flex flex-col gap-[10px] outline-none"
                  >
                    {isSuccess && pending.length > 0 ? (
                      pending.map((item: OrderDataResponse) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedOrderId(item.id)}
                          className="cursor-pointer transition-transform duration-200 active:scale-[0.99]"
                        >
                          <OnlineOrderList
                            id={item.id}
                            timestamp={item.order_date}
                            total_items={item.order_details.length}
                            total_price={item.total}
                            status={item.status}
                            buttonActive={selectedOrderId === item.id}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col justify-center items-center h-[400px] bg-white rounded-xl border border-dashed border-gray-200 p-6">
                        <Clock className="h-16 w-16 text-hijaugelap/60 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Tidak ada pesanan menunggu
                        </h3>
                        <p className="text-muted-foreground text-center max-w-xs">
                          Semua pesanan sudah diselesaikan
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent
                    value="completed"
                    className="flex flex-col gap-[10px] outline-none mt-0"
                  >
                    {isSuccess && completed.length > 0 ? (
                      completed.map((item: OrderDataResponse) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedOrderId(item.id)}
                          className="cursor-pointer transition-transform duration-200 active:scale-[0.99]"
                        >
                          <OnlineOrderList
                            id={item.id}
                            timestamp={item.order_date}
                            total_items={item.order_details.length}
                            total_price={item.total}
                            status={item.status}
                            buttonActive={selectedOrderId === item.id}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col justify-center items-center h-[400px] bg-white rounded-xl border border-dashed border-gray-200 p-6">
                        <CheckCircle className="h-16 w-16 text-hijaugelap/60 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Belum ada pesanan selesai
                        </h3>
                        <p className="text-muted-foreground text-center max-w-xs">
                          Pesanan yang sudah diselesaikan akan muncul di sini
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
        {orderDetail && (
          <SheetContent className="bg-white p-0 w-full sm:max-w-md border-l border-gray-100 shadow-2xl">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-hijaugelap" />
                  <span className="text-sm text-gray-500">
                    Loading detail...
                  </span>
                </div>
              }
            >
              <OnlineOrderDetail data={orderDetail} />
            </Suspense>
          </SheetContent>
        )}
      </div>
    </Sheet>
  );
};
export default OnlineOrder;
