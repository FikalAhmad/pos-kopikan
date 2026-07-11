"use client";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const BottomBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex flex-col">
        <div
          onClick={() => setOpen(!open)}
          className={cn(
            `rounded-t-lg flex gap-2 px-3 py-2 items-center max-w-max transition-all duration-300 ease-in-out`,
            open
              ? "bg-white text-hijaugelap translate-y-0"
              : "bg-hijaugelap text-white translate-y-20",
          )}
        >
          <div className="text-sm">Track Order</div>
          <div
            className={cn(
              "rounded-full p-1",
              open ? "text-hijaugelap" : "bg-white text-hijaugelap",
            )}
          >
            {open ? (
              <MinusIcon className="w-5 h-5" />
            ) : (
              <PlusIcon className="w-5 h-5" />
            )}
          </div>
        </div>
        <div
          className={cn(
            "h-20 bg-white transition-all duration-300 ease-in-out p-2 flex gap-2",
            !open && "translate-y-20",
          )}
        >
          <div className="flex gap-4 justify-between border border-hijaugelap w-fit rounded-xl px-5 py-2">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold">Mike</div>
              <div className="text-[8px] text-gray-500">Table 04 - Dine In</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[2px] font-semibold">All Done</div>
              <div className="text-[8px] text-gray-500">08:45 AM</div>
            </div>
          </div>
          <div className="flex gap-4 justify-between border border-hijaugelap w-fit rounded-xl px-5 py-2">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold">Mike</div>
              <div className="text-[8px] text-gray-500">Table 04 - Dine In</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[2px] font-semibold">All Done</div>
              <div className="text-[8px] text-gray-500">08:45 AM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
