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

const TableDashboard = () => {
  return (
    <div className="py-9 px-3 shadow-lg">
      <div className="text-[16px] font-bold">Ordered Items</div>
      <Table className="px-4 py-9">
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="w-[100px]" colSpan={2}>
              Item
            </TableHead>
            <TableHead className="text-center">Orders</TableHead>
            <TableHead className="text-center">PPU</TableHead>
            <TableHead className="text-center">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-xs">
            <TableCell className="font-medium" colSpan={2}>
              <div className="flex items-center gap-5">
                <Image
                  src={AlmondChoco}
                  alt="Coffee"
                  width={30}
                  height={30}
                  className="rounded"
                  priority
                />
                Almond Choco
              </div>
            </TableCell>
            <TableCell className="text-center">12312</TableCell>
            <TableCell className="text-center">24324</TableCell>
            <TableCell className="text-center">325235</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDashboard;
