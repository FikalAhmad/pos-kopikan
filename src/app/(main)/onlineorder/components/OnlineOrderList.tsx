import { useEffect, useState } from "react";
import formatPrice from "@/lib/rupiah";
import { CheckCircle, Clock } from "lucide-react";

type OnlineOrderListProps = {
  id: string;
  timestamp: string;
  total_items: number;
  total_price: number;
  status: string;
  buttonActive?: boolean;
};

const OnlineOrderList = ({
  id,
  timestamp,
  total_items,
  total_price,
  status,
  buttonActive,
}: OnlineOrderListProps) => {
  const [formattedDate, setFormattedDate] = useState("");

  // Hydration-safe date formatting
  useEffect(() => {
    setFormattedDate(
      new Date(timestamp).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    );
  }, [timestamp]);

  // Formatter status yang proper (Title Case: Pending & Completed)
  const formattedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <div
      className={`w-full flex flex-col px-5 py-4 border gap-4 font-bold text-xs rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${
        buttonActive
          ? "bg-hijaugelap text-white border-hijaugelap"
          : "bg-white text-gray-800 hover:bg-gray-50 border-gray-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className={buttonActive ? "text-white" : "text-gray-900"}>
          Order <span className="font-mono">#{id}</span>
        </div>
        <div
          className={`font-normal text-[11px] ${buttonActive ? "text-emerald-100" : "text-gray-400"}`}
        >
          {formattedDate || "Memuat tanggal..."}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-100/10 pt-3">
        <div className="flex items-center gap-2">
          <span
            className={`font-normal ${buttonActive ? "text-emerald-100" : "text-gray-500"}`}
          >
            Jumlah item:
          </span>
          <span
            className={`px-2 py-0.5 rounded-md text-[11px] ${buttonActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {total_items}
          </span>
        </div>

        <div className="flex justify-between gap-4 items-center">
          <div
            className={`text-sm font-extrabold ${buttonActive ? "text-white" : "text-hijaugelap"}`}
          >
            {formatPrice(total_price)}
          </div>

          <div
            className={`h-7 px-3 rounded-full text-[11px] flex justify-center items-center font-semibold gap-1 transition-colors ${
              status === "PENDING"
                ? buttonActive
                  ? "bg-amber-500 text-white"
                  : "bg-amber-50 text-amber-600 border border-amber-200"
                : buttonActive
                  ? "bg-emerald-500 text-white"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-200"
            }`}
          >
            {status === "PENDING" ? (
              <Clock className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5" />
            )}
            {formattedStatus}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrderList;
