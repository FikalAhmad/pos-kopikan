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
    <Table className="px-4 py-9">
      <TableHeader>
        <TableRow className="font-bold text-[16px]">Ordered Items</TableRow>
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
        <TableRow>
          <TableCell
            className="font-medium flex items-center gap-2"
            colSpan={2}
          >
            <Image
              src={AlmondChoco}
              alt="Coffee"
              width={30}
              height={30}
              className="rounded"
            />
            Almond Choco
          </TableCell>
          <TableCell>12312</TableCell>
          <TableCell>24324</TableCell>
          <TableCell className="text-right">325235</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableDashboard;
