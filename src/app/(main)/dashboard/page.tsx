"use client";

import Image from "next/image";
import CashIcon from "@/public/assets/images/cash-1.svg";
import OrderIcon from "@/public/assets/images/orders.svg";
import CustomerIcon from "@/public/assets/images/customers.svg";
import cursorIcon from "@/public/assets/images/onlineOrders.svg";
import TableDashboard from "./components/TableDashboard";
import StatisticDashboard from "./components/StatisticDashboard";
import { useFetch } from "@/hooks/api/useFetch";
import { ProductWithOption } from "@/types/product.types";
import formatPrice from "@/lib/rupiah";

export type ProductDetailProps = ProductWithOption & {
  order_details: {
    id: string;
    order_id: string;
    product_id: string;
    qty: number;
    total_price: number;
    unit_price: number;
  }[];
};

const Dashboard = () => {
  const { data: dataTotalSummary } = useFetch(
    ["total-summary"],
    "/api/dashboard/total-summary"
  );

  const menu = [
    {
      id: 1,
      icon: CashIcon,
      value: formatPrice(dataTotalSummary?.totalRevenue),
      detail: "Total Revenue",
    },
    {
      id: 2,
      icon: OrderIcon,
      value: dataTotalSummary?.totalOrder,
      detail: "Total Orders",
    },
    {
      id: 3,
      icon: CustomerIcon,
      value: dataTotalSummary?.totalOrderOffline,
      detail: "Walk-ins",
    },
    {
      id: 4,
      icon: cursorIcon,
      value: dataTotalSummary?.totalOrderOnline,
      detail: "Online Orders",
    },
  ];
  return (
    <div className="w-full h-full flex gap-6 flex-col lg:flex-row overflow-hidden pb-4">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex justify-between my-[30px] gap-5">
          {menu?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex w-[110px] h-[110px] flex-col bg-hijaugelap text-white gap-4 py-[18px] px-3 rounded shrink-0"
              >
                <Image src={item.icon} alt="Cash Icon" className="invert" />
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-[16px] truncate">
                    {item.value || 0}
                  </div>
                  <div className="text-xs">{item.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 overflow-hidden">
          <TableDashboard />
        </div>
      </div>
      <StatisticDashboard />
    </div>
  );
};

export default Dashboard;
