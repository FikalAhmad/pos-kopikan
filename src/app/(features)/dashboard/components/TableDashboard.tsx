"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import AlmondChoco from "@/public/assets/product-images/AlmondChoco.png";
import { ScrollArea } from "@/components/ui/scroll-area";

const TableDashboard = () => {
  return (
    <div className="py-9 px-3 shadow-lg h-[485px] bg-white">
      <div className="text-[16px] font-bold">Ordered Items</div>
      <Table className="px-4 py-9">
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="w-[150px]" colSpan={1}>
              Item
            </TableHead>
            <TableHead className="w-[100px] text-center">Orders</TableHead>
            <TableHead className="w-[100px] text-center">PPU</TableHead>
            <TableHead className="w-[100px] text-center">Revenue</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-96 pb-3">
        <Table>
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
              return (
                <TableRow className="text-xs" key={`prp-${index}`}>
                  <TableCell className="font-medium w-[150px]" colSpan={1}>
                    <div className="flex items-center gap-5">
                      <Image
                        src={AlmondChoco}
                        alt="Coffee"
                        width={30}
                        height={30}
                        className="rounded"
                        priority
                      />
                      <span>Butterscotch Sea Salt Latte</span>
                    </div>
                  </TableCell>
                  <TableCell className="w-[100px] text-center">12312</TableCell>
                  <TableCell className="w-[100px] text-center">24324</TableCell>
                  <TableCell className="w-[100px] text-center">
                    325235
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default TableDashboard;
