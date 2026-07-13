"use client";

import CalendarFilter from "@/components/CalendarFilter";
import DownloadReport from "@/components/DownloadReport";
import OrderToggle from "@/components/OrderToggle";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

const ReportTopbar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith("/onlineorder")) return "Online Order";
    if (pathname.startsWith("/inventory")) return "Inventory";
    if (pathname.startsWith("/teams")) return "Teams";
    if (pathname.startsWith("/settings")) return "Settings";
    return "Report";
  };

  const title = getTitle();
  const isDashboard = pathname === "/dashboard" || pathname === "/";

  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-5">
        <Sidebar />
        <span className="text-2xl font-medium text-gray-800">{title}</span>
      </div>
      {isDashboard && (
        <div className="flex items-center gap-3">
          <DownloadReport />
          <CalendarFilter mode="single" selected={date} onSelect={setDate}>
            {format(date, "dd MMM yyyy", { locale: id })}
          </CalendarFilter>
          <OrderToggle />
        </div>
      )}
    </div>
  );
};

export default ReportTopbar;
