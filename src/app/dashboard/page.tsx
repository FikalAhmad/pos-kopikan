"use client";

import moment from "moment";
import "moment/locale/id";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toRupiah from "@develoka/angka-rupiah-js";
import CashIcon from "@/public/assets/images/cash-1.svg";
import OrderIcon from "@/public/assets/images/orders.svg";
import CustomerIcon from "@/public/assets/images/customers.svg";
import cursorIcon from "@/public/assets/images/onlineOrders.svg";
import TableDashboard from "@/_components/Dashboard/TableDashboard";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(
    moment().locale("id").format("Do MMMM YYYY dddd | h:mm")
  );

  const menu = [
    {
      id: 1,
      icon: CashIcon,
      value: toRupiah(50000, {
        symbol: "IDR",
        formal: false,
        useUnit: true,
        k: true,
        floatingPoint: 0,
      }),
      detail: "Total Revenue",
    },
    {
      id: 2,
      icon: OrderIcon,
      value: "50000",
      detail: "Total Orders",
    },
    {
      id: 3,
      icon: CustomerIcon,
      value: "50000",
      detail: "Walk-ins",
    },
    {
      id: 4,
      icon: cursorIcon,
      value: "50000",
      detail: "Online Orders",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().locale("id").format("Do MMMM YYYY, dddd | h:mm"));
    }, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="w-full flex gap-[22px]">
      <div className="w-[509px] border-2">
        <div className="text-[16px]">{currentTime}</div>
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
      <div>Overall</div>
    </div>
  );
};

export default Dashboard;
