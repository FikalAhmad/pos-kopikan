"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Sidebar from "@/components/Sidebar";
import OrderToggle from "@/components/OrderToggle";
import { format } from "date-fns";

const Topbar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentTime, setCurrentTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="flex gap-5 w-full py-2">
        <Sidebar />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 p-1 pr-4 flex items-center gap-2 text-md font-medium rounded-full bg-white text-black justify-center shadow-sm hover:bg-gray-50 transition-colors cursor-pointer border-none"
              >
                <div className="w-10 h-10 rounded-full bg-hijaugelap/10 flex items-center justify-center transition-colors shadow-sm">
                  <CalendarDaysIcon className="w-5 h-5 text-hijaugelap" />
                </div>
                <p>{date ? format(date, "eee, d MMM yyyy") : "Pilih Tanggal"}</p>
              </Button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-1">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        setIsOpen(false);
                      }}
                      className="rounded-lg"
                      captionLayout="dropdown"
                    />
                  </div>
                </>
              )}
            </div>
            <p className="text-gray-400">—</p>
            <div className="h-12 p-1 pr-4 flex items-center gap-2 text-md font-medium rounded-full bg-white text-black justify-center shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-hijaugelap/10 flex items-center justify-center transition-colors shadow-sm">
                <ClockIcon className="w-5 h-5 text-hijaugelap" />
              </div>
              <p>{currentTime || "11:21 AM"}</p>
            </div>
          </div>
          <OrderToggle />
        </div>
      </div>
    </>
  );
};

export default Topbar;
