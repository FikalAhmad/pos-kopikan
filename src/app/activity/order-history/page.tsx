"use client";

import CalendarFilter from "@/components/CalendarFilter";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatPrice from "@/lib/rupiah";
import { addDays, format } from "date-fns";
import { FilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import OrderDetails from "./components/OrderDetails";
import { getStatusBadgeClassName } from "@/utils/status";
import { useGetAllOrdersQuery } from "@/redux/features/api/ordersApi";
import { Badge } from "@/components/ui/badge";

const OrderHistorySection = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });

  const { data: orders, isLoading } = useGetAllOrdersQuery();
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2">
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              Date:
              <CalendarFilter
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
              >
                {format(dateRange?.from || new Date(), "eee, d MMM yyyy")}
              </CalendarFilter>
            </div>
            <span>-</span>
            <div>
              <CalendarFilter
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
              >
                {format(dateRange?.to || new Date(), "eee, d MMM yyyy")}
              </CalendarFilter>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant={"outline"} className="rounded-lg">
            <SearchIcon size={16} />
          </Button>
          <Button size="icon" variant={"outline"} className="rounded-lg">
            <FilterIcon size={16} />
          </Button>
        </div>
      </div>
      <div className="bg-white py-2 pl-4 rounded-lg flex flex-col max-h-[calc(100vh-140px)] overflow-y-auto">
        <Table className="text-center">
          <TableHeader className="text-xs">
            <TableRow>
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">#</div>
              </TableHead>
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">
                  Date & Time
                </div>
              </TableHead>
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">
                  Customer Name
                </div>
              </TableHead>
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">
                  Order Status
                </div>
              </TableHead>
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">
                  Total Payment
                </div>
              </TableHead>
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">
                  Payment Status
                </div>
              </TableHead>
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">Action</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading Skeleton State
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  <TableCell>
                    <div className="h-4 w-12 bg-gray-200 rounded-full mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-gray-200 rounded-full mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded-full mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-gray-100 rounded-full mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-gray-200 rounded-full mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-gray-100 rounded-full mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-20 bg-gray-200 rounded-lg mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : !orders?.data || orders.data.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-48 text-center bg-gray-50/50"
                >
                  <div className="flex flex-col items-center justify-center gap-2.5 text-gray-400 py-6">
                    <div className="p-3 rounded-full bg-gray-100/80 text-gray-400/80">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600 text-sm">
                        No Orders Found
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        There are no orders recorded in this period.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data Render State
              orders.data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.order_number}</TableCell>
                  <TableCell>
                    {format(
                      new Date(order.createdAt),
                      "eee, d MMM yyyy - hh:mm a",
                    )}
                  </TableCell>
                  <TableCell>{order.customer_name || "-"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClassName(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatPrice(order.total)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClassName(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <OrderDetails
                      orderId={order.order_number}
                      dateTime={`${format(
                        new Date(order.createdAt),
                        "eee, d MMM yyyy - hh:mm a",
                      )}`}
                      customerName={order.customer_name}
                      orderStatus={order.status}
                      totalPayment={order.total}
                      paymentStatus={order.status}
                      items={
                        order.order_details?.map((orderDetail) => ({
                          name: orderDetail.product.product_name,
                          qty: orderDetail.qty,
                          price: orderDetail.unit_price,
                          image: orderDetail.product.image,
                        })) || []
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderHistorySection;
