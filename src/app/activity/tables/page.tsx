"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetch } from "@/hooks/api/useFetch";
import { FilterIcon, Plus } from "lucide-react";

type TableResponse = {
  id: string;
  table_number: string;
  qr_token: string;
  is_active: boolean;
};
const TablesSection = () => {
  const { data: tableList } = useFetch<TableResponse[]>(
    ["tables"],
    "/api/tables",
  );
  return (
    <div className="w-full flex flex-col justify-between h-[calc(100vh-100px)]">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg">
          <h2 className="font-semibold">Add Table</h2>
          <Button
            className="bg-hijaugelap/20 text-hijaugelap rounded-full"
            size={"icon"}
          >
            <Plus size={16} />
          </Button>
        </div>
        <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg">
          <Tabs
            defaultValue="1"
            className="w-full bg-white p-2 rounded-lg shadow-sm"
          >
            <div className="flex flex-row justify-between items-center w-full border-b border-gray-100">
              <TabsList className="flex gap-5 bg-transparent justify-start h-auto p-0 border-none">
                <TabsTrigger
                  value="1"
                  className="border border-transparent data-[state=active]:shadow-none data-[state=active]:border-hijaugelap data-[state=active]:bg-white data-[state=active]:text-hijaugelap rounded-full text-gray-500 px-10 py-2 text-sm transition-all bg-gray-100"
                >
                  1st Floor
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-2 h-fit">
                <Button className="rounded-full" size={"icon"}>
                  <FilterIcon size={16} />
                </Button>
              </div>
            </div>

            <ScrollArea
              type="always"
              className="h-[calc(100vh-400px)] pr-2 scroll-smooth border-b border-gray-100"
            >
              <TabsContent
                value="1"
                className="w-full data-[state=inactive]:hidden grid grid-cols-3 gap-2"
              >
                {tableList?.map((table) => (
                  <div
                    className="flex flex-col justify-between items-center bg-hijaugelap/20 text-xs px-2 py-2"
                    key={table.id}
                  >
                    <div className="flex flex-col">
                      <div className="px-2 py-1 bg-hijaugelap rounded-full text-white">
                        {table.table_number}
                      </div>
                      <div className="text-hijaugelap">Sharon</div>
                    </div>
                    <div className="">10.00 AM</div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent
                value="2"
                className="w-full data-[state=inactive]:hidden grid grid-cols-3 gap-2"
              >
                <div className="flex flex-col justify-between items-center bg-hijaugelap/20 text-xs px-2 py-2">
                  <div className="flex flex-col">
                    <div className="px-2 py-1 bg-hijaugelap rounded-full text-white">
                      T-01
                    </div>
                    <div className="text-hijaugelap">Sharon</div>
                  </div>
                  <div className="">10.00 AM</div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
      <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg">
        <div>Table Status:</div>
        <div className="flex gap-5">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div>Available</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-hijaugelap rounded-full"></div>
            <div>Served</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div>Reserved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesSection;
