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
import formatPrice from "@/lib/rupiah";
import { Card, CardContent } from "@/components/ui/card";

type ProductSummaryProps = {
  product_id: string;
  product_image: string;
  product_name: string;
  total_orders: number;
  total_qty: number;
  total_sales: number;
};

const TableDashboard = () => {
  const { data: dataOrderSummary } = useFetch<ProductSummaryProps[]>(
    ["order-summary"],
    "/api/dashboard/order-summary",
  );

  return (
    <Card className="h-full bg-white flex flex-col overflow-hidden">
      <CardContent className="p-3 flex-1 flex flex-col overflow-hidden">
        <div className="text-[16px] font-bold shrink-0 mb-2">Ordered Items</div>
        <div className="shrink-0 overflow-x-auto">
          <Table className="px-4">
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
        </div>
        <ScrollArea className="flex-1 overflow-y-auto">
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
                      {formatPrice(item.total_sales)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TableDashboard;
