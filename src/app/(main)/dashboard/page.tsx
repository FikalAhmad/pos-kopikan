"use client";

import Image from "next/image";
import CashIcon from "@/public/assets/images/cash-1.svg";
import OrderIcon from "@/public/assets/images/orders.svg";
import CustomerIcon from "@/public/assets/images/customers.svg";
import cursorIcon from "@/public/assets/images/onlineOrders.svg";
import TableDashboard from "./components/TableDashboard";
import StatisticDashboard from "./components/StatisticDashboard";
import Clock from "./components/Clock";
import { useFetch } from "@/hooks/api/useFetch";
import { Product } from "@/types/product.types";

export type ProductDetailProps = Product & {
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
      value: dataTotalSummary?.totalRevenue,
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
    <div className="w-full flex gap-6 flex-col lg:flex-row">
      <div className="w-[509px]">
        <div className="text-[16px]">
          <Clock />
        </div>
        <div className="flex justify-between my-[30px]">
          {menu.map((item) => {
            return (
              <div
                key={item.id}
                className="flex w-[110px] h-[110px] flex-col bg-hijaugelap text-white gap-4 py-[18px] px-3 rounded"
              >
                <Image src={item.icon} alt="Cash Icon" className="invert" />
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-[16px]">{item.value}</div>
                  <div className="text-xs">{item.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
        <TableDashboard />
      </div>
      <StatisticDashboard />
    </div>
  );
};

export default Dashboard;
