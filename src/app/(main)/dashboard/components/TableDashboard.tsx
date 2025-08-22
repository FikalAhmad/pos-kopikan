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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetch } from "@/hooks/api/useFetch";

type ProductSummaryProps = {
  product_id: string;
  product_image: string;
  product_name: string;
  total_orders: number;
  total_qty: number;
  total_sales: number;
};

const TableDashboard = () => {
  const { data: dataOrderSummary } = useFetch(
    ["order-summary"],
    "/api/dashboard/order-summary"
  );

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
            {dataOrderSummary?.map((item: ProductSummaryProps) => {
              return (
                <TableRow className="text-xs" key={item.product_id}>
                  <TableCell className="font-medium w-[150px]" colSpan={1}>
                    <div className="flex items-center gap-5">
                      <Image
                        src={item.product_image}
                        alt="Coffee"
                        width={30}
                        height={30}
                        className="rounded"
                        priority
                      />
                      <span>{item.product_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="w-[100px] text-center">
                    {item.total_orders}
                  </TableCell>
                  <TableCell className="w-[100px] text-center">
                    {item.total_qty}
                  </TableCell>
                  <TableCell className="w-[100px] text-center">
                    {item.total_sales}
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
