import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type NavProductProps = {
  categoryName: string;
  label: string;
  isActive: boolean;
  itemCount: number;
  icon: LucideIcon;
  setCategory: (category: string) => void;
};

const NavProduct = ({
  categoryName,
  label,
  isActive,
  itemCount,
  icon: Icon,
  setCategory,
}: NavProductProps) => {
  return (
    <Button
      onClick={() => setCategory(categoryName.toLowerCase())}
      variant="outline"
      className={`flex flex-col justify-between p-4 rounded-2xl w-[130px] h-[120px] transition-all duration-300 border cursor-pointer ${
        isActive
          ? "bg-hijaugelap/10 hover:bg-hijaugelap/20 border-hijaugelap"
          : "bg-white/80 hover:bg-white border-gray-100 hover:shadow-md"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isActive
            ? "bg-hijaugelap hover:bg-[#206400] text-white"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col mt-2">
        <span
          className={`text-[14px] leading-tight font-bold ${
            isActive ? "text-gray-900" : "text-gray-700"
          }`}
        >
          {label}
        </span>
        <span className="text-[11px] text-gray-400 font-medium mt-0.5">
          {itemCount} Items
        </span>
      </div>
    </Button>
  );
};

export default NavProduct;
