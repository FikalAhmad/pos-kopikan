import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Clock from "../dashboard/components/Clock";
import OnlineOrderList from "./components/OnlineOrderList";
import OnlineOrderDetail from "./components/OnlineOrderDetail";

const OnlineOrder = () => {
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
              <OnlineOrderList />
              <OnlineOrderList />
              <OnlineOrderList />
            </TabsContent>
            <TabsContent
              value="completed"
              className="flex flex-col gap-[10px] mt-0"
            >
              <OnlineOrderList />
              <OnlineOrderList />
              <OnlineOrderList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <OnlineOrderDetail />
      {/* orderId: dapet dari looping online order list idnya kirim ke usestate nnti baru ambil dari usestate */}
      
    </div>
  );
};

export default OnlineOrder;
