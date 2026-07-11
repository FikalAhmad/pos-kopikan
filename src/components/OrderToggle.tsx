"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { PowerIcon } from "lucide-react";

const OrderToggle = () => {
  const [isOrderOpen, setIsOrderOpen] = useState(true);
  return (
    <Button className="h-12 p-1 pl-4 pr-1 flex items-center gap-3 bg-white rounded-full border-gray-200 hover:bg-gray-50 transition-all cursor-pointer">
      <div
        className={`flex items-center gap-2 text-md font-medium justify-center ${
          isOrderOpen ? "text-hijaugelap" : "text-red-600"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full animate-pulse ${
            isOrderOpen ? "bg-hijaugelap" : "bg-red-600"
          }`}
        />
        {isOrderOpen ? "Open Order" : "Close Order"}
      </div>
      <Button
        onClick={() => setIsOrderOpen(!isOrderOpen)}
        className={`w-10 h-10 p-0 rounded-full transition-colors shadow-sm flex items-center justify-center border-none shrink-0 ${
          isOrderOpen
            ? "bg-hijaugelap/10 hover:bg-hijaugelap/20 text-hijaugelap"
            : "bg-red-600/10 hover:bg-red-600/20 text-red-600"
        }`}
      >
        <PowerIcon className="w-5 h-5" />
      </Button>
    </Button>
  );
};

export default OrderToggle;
