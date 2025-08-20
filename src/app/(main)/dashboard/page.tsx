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
  const { data: ProductSummary } = useFetch(["products"], "/api/products");
  const { data: OrderSummary } = useFetch(["orders"], "/api/orders");

  const productSum = ProductSummary?.map((product: ProductDetailProps) => {
    const totalOrder = new Set(product.order_details.map((od) => od.order_id))
      .size;
    const totalQty = product.order_details.reduce((acc, od) => acc + od.qty, 0);
    const totalPrice = product.order_details.reduce(
      (acc, od) => acc + od.total_price,
      0
    );

    return {
      product_image: product.image,
      product_name: product.product_name,
      total_order: totalOrder,
      total_qty: totalQty,
      total_price: totalPrice,
    };
  });

  const totalRevenue = (productSum ?? []).reduce(
    (acc: { total_price: number }, curr: { total_price: number }) => {
      return {
        total_price: acc.total_price + (curr.total_price ?? 0),
      };
    },
    { total_price: 0 }
  );

  const menu = [
    {
      id: 1,
      icon: CashIcon,
      value: totalRevenue.total_price,
      detail: "Total Revenue",
    },
    {
      id: 2,
      icon: OrderIcon,
      value: OrderSummary?.length,
      detail: "Total Orders",
    },
    {
      id: 3,
      icon: CustomerIcon,
      value: "0",
      detail: "Walk-ins",
    },
    {
      id: 4,
      icon: cursorIcon,
      value: "0",
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
        <TableDashboard data={productSum} />
      </div>
      <StatisticDashboard />
    </div>
  );
};

export default Dashboard;
