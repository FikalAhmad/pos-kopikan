import { useFetch } from "@/hooks/api/useFetch";
import formatPrice from "@/lib/rupiah";
import clsx from "clsx";
import { ReceiptIcon, TrendingUpIcon, Users2Icon } from "lucide-react";

type DataSummaryResponse = {
  summary: {
    totalSalesAmount: {
      change: {
        percentage: number;
        type: string;
        value: number;
      };
      currency: string;
      value: number;
    };
    totalProductSales: {
      change: {
        percentage: number;
        type: string;
        value: number;
      };
      unit: string;
      value: number;
    };
    totalCustomer: {
      change: {
        percentage: number;
        type: string;
        value: number;
      };
      unit: string;
      value: number;
    };
    netProfit: {
      change: {
        percentage: number;
        type: string;
        value: number;
      };
      currency: string;
      value: number;
    };
  };
};
const SummarySelling = ({ period }: { period?: string }) => {
  const { data: dataSummary } = useFetch<DataSummaryResponse>(
    ["dashboard-summary", period ?? ""],
    `/api/dashboard/summary?period=${period}`,
  );
  const totalSalesAmount = dataSummary?.summary.totalSalesAmount;
  const totalProductSales = dataSummary?.summary.totalProductSales;
  const totalCustomer = dataSummary?.summary.totalCustomer;
  const netProfit = dataSummary?.summary.netProfit;

  console.log(netProfit);

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="flex flex-col justify-between gap-4 bg-white rounded-lg p-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-200">
            <TrendingUpIcon size={16} className="shrink-0" />
          </div>
          <div className="font-semibold text-sm">Total Sales Amount</div>
        </div>
        <div className="flex justify-between items-end">
          <div className="font-semibold text-2xl">
            {formatPrice(totalSalesAmount?.value ?? 0)}
          </div>
          <div className="text-xs text-gray-500">
            {totalSalesAmount?.currency}
          </div>
        </div>
        <div
          className={clsx(
            "flex justify-between text-[4px]",
            totalSalesAmount?.change.type == "increase"
              ? "text-hijaugelap"
              : "text-red-500",
          )}
        >
          <div
            className={clsx(
              "py-1 px-2 rounded-full",
              totalSalesAmount?.change.type == "increase"
                ? "bg-hijaugelap/20"
                : "bg-red-500/20",
            )}
          >
            {totalSalesAmount?.change.type == "increase" ? "+" : "-"}{" "}
            {formatPrice(totalSalesAmount?.change.value ?? 0)} IDR
          </div>
          <div
            className={clsx(
              "py-1 px-2 rounded-full",
              totalSalesAmount?.change.type == "increase"
                ? "bg-hijaugelap/20"
                : "bg-red-500/20",
            )}
          >
            12.2 % {totalSalesAmount?.change.type == "increase" ? "↑" : "↓"}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 bg-white rounded-lg p-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-200">
            <TrendingUpIcon size={16} className="shrink-0" />
          </div>
          <div className="font-semibold text-sm">Total Product Sales</div>
        </div>
        <div className="flex justify-between items-end">
          <div className="font-semibold text-2xl">
            {totalProductSales?.value}
          </div>
          <div className="text-xs text-gray-500">Items</div>
        </div>
        <div
          className={clsx(
            "flex justify-between text-[4px]",
            totalProductSales?.change.type == "increase"
              ? "text-hijaugelap"
              : "text-red-500",
          )}
        >
          <div
            className={clsx(
              "py-1 px-2 rounded-full",
              totalProductSales?.change.type == "increase"
                ? "bg-hijaugelap/20"
                : "bg-red-500/20",
            )}
          >
            {totalProductSales?.change.type == "increase" ? "+" : "-"}{" "}
            {totalProductSales?.change.value} Items
          </div>
          <div
            className={clsx(
              "py-1 px-2 rounded-full",
              totalProductSales?.change.type == "increase"
                ? "bg-hijaugelap/20"
                : "bg-red-500/20",
            )}
          >
            10 % {totalProductSales?.change.type == "increase" ? "↑" : "↓"}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 bg-white rounded-lg p-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-200">
            <Users2Icon size={16} className="shrink-0" />
          </div>
          <div className="font-semibold text-sm">Total Customer</div>
        </div>
        <div className="flex justify-between items-end">
          <div className="font-semibold text-2xl">{totalCustomer?.value}</div>
          <div className="text-xs text-gray-500">Persons</div>
        </div>
        <div
          className={clsx(
            "flex justify-between text-[4px]",
            totalCustomer?.change.type == "increase"
              ? "text-hijaugelap"
              : "text-red-500",
          )}
        >
          <div
            className={clsx(
              "py-1 px-2 rounded-full",
              totalCustomer?.change.type == "increase"
                ? "bg-hijaugelap/20"
                : "bg-red-500/20",
            )}
          >
            {totalCustomer?.change.type == "increase" ? "+" : "-"}{" "}
            {totalCustomer?.change.value} Persons
          </div>
          <div
            className={clsx(
              "py-1 px-2 rounded-full",
              totalCustomer?.change.type == "increase"
                ? "bg-hijaugelap/20"
                : "bg-red-500/20",
            )}
          >
            0.02 % {totalCustomer?.change.type == "increase" ? "↑" : "↓"}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 bg-white rounded-lg p-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-200">
            <ReceiptIcon size={16} className="shrink-0" />
          </div>
          <div className="font-semibold text-sm">Net Profit</div>
        </div>
        <div className="flex justify-between items-end">
          <div className="font-semibold text-2xl">
            {formatPrice(netProfit?.value ?? 0)}
          </div>
          <div className="text-xs text-gray-500">IDR</div>
        </div>
        <div
          className={clsx(
            "flex justify-between text-[4px]",
            netProfit?.change.type == "increase"
              ? "text-hijaugelap"
              : "text-red-500",
          )}
        >
          <div
            className={clsx(
              "py-1 px-2 rounded-full",
              netProfit?.change.type == "increase"
                ? "bg-hijaugelap/20"
                : "bg-red-500/20",
            )}
          >
            {netProfit?.change.type == "increase" ? "+" : "-"}{" "}
            {formatPrice(netProfit?.change.value ?? 0)} IDR
          </div>
          <div
            className={clsx(
              "py-1 px-2 rounded-full",
              netProfit?.change.type == "increase"
                ? "bg-hijaugelap/20"
                : "bg-red-500/20",
            )}
          >
            12.2 % {netProfit?.change.type == "increase" ? "↑" : "↓"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySelling;
