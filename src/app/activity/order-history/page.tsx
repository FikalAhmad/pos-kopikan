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

const OrderHistorySection = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });
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
      <div className="bg-white py-2 px-4 rounded-lg flex flex-col h-calc(100vh-100px)">
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
            <TableRow>
              <TableCell>001</TableCell>
              <TableCell>04/02/2001-02.00 PM</TableCell>
              <TableCell>Fikal</TableCell>
              <TableCell>Done</TableCell>
              <TableCell>{formatPrice(31000)}</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>
                <OrderDetails
                  orderId="001"
                  dateTime="04/02/2001 - 02.00 PM"
                  customerName="Fikal"
                  orderStatus="Done"
                  totalPayment={31000}
                  paymentStatus="Paid"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>001</TableCell>
              <TableCell>04/02/2001-02.00 PM</TableCell>
              <TableCell>Fikal</TableCell>
              <TableCell>Done</TableCell>
              <TableCell>{formatPrice(31000)}</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>
                <OrderDetails
                  orderId="001"
                  dateTime="04/02/2001 - 02.00 PM"
                  customerName="Fikal"
                  orderStatus="Done"
                  totalPayment={31000}
                  paymentStatus="Paid"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>001</TableCell>
              <TableCell>04/02/2001-02.00 PM</TableCell>
              <TableCell>Fikal</TableCell>
              <TableCell>Done</TableCell>
              <TableCell>{formatPrice(31000)}</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>
                <OrderDetails
                  orderId="001"
                  dateTime="04/02/2001 - 02.00 PM"
                  customerName="Fikal"
                  orderStatus="Done"
                  totalPayment={31000}
                  paymentStatus="Paid"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderHistorySection;
