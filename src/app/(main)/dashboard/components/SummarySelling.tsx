import { ReceiptIcon, TrendingUpIcon, Users2Icon } from "lucide-react";

const SummarySelling = () => {
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
          <div className="font-semibold text-2xl">12.500</div>
          <div className="text-xs text-gray-500">IDR</div>
        </div>
        <div className="flex justify-between text-[4px] text-hijaugelap">
          <div className="bg-hijaugelap/20 py-1 px-2 rounded-full">
            + IDR 1.000
          </div>
          <div className="bg-hijaugelap/20 py-1 px-2 rounded-full">
            12.2 % ↑
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
          <div className="font-semibold text-2xl">1.250</div>
          <div className="text-xs text-gray-500">Items</div>
        </div>
        <div className="flex justify-between text-[4px] text-hijaugelap">
          <div className="bg-hijaugelap/20 py-1 px-2 rounded-full">
            + 250 Items
          </div>
          <div className="bg-hijaugelap/20 py-1 px-2 rounded-full">10 % ↑</div>
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
          <div className="font-semibold text-2xl">500</div>
          <div className="text-xs text-gray-500">Persons</div>
        </div>
        <div className="flex justify-between text-[4px] text-hijaugelap">
          <div className="bg-red-500/20 text-red-500 py-1 px-2 rounded-full">
            - 5 Persons
          </div>
          <div className="bg-red-500/20 text-red-500 py-1 px-2 rounded-full">
            0.02 % ↓
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
          <div className="font-semibold text-2xl">12.500</div>
          <div className="text-xs text-gray-500">IDR</div>
        </div>
        <div className="flex justify-between text-[4px] text-hijaugelap">
          <div className="bg-hijaugelap/20 py-1 px-2 rounded-full">
            + IDR 1.000
          </div>
          <div className="bg-hijaugelap/20 py-1 px-2 rounded-full">
            12.2 % ↑
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySelling;
