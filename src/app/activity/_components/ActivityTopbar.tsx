"use client";

import CalendarFilter from "@/components/CalendarFilter";
import DownloadReport from "@/components/DownloadReport";
import OrderToggle from "@/components/OrderToggle";
import Sidebar from "@/components/Sidebar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

const ActivityTopbar = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="flex items-center justify-between gap-2 py-2 mb-2">
      <div className="flex items-center gap-5">
        <Sidebar />
        <span className="text-2xl font-medium">Report</span>
      </div>

      <div className="flex items-center gap-3">
        <DownloadReport />
        <CalendarFilter selected={date} onSelect={setDate} mode="single">
          <span className="text-sm font-medium text-gray-700">
            {format(date, "eee, d MMM yyyy", { locale: id })}
          </span>
        </CalendarFilter>
        <OrderToggle />
      </div>
    </div>
  );
};

export default ActivityTopbar;
