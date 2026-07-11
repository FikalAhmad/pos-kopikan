import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiscountProps } from "@/types/discount.types";
import { Dispatch, SetStateAction } from "react";
import { TicketPercentIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiscountComponentProps {
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
  discountData: DiscountProps[];
}

const Discount = ({
  value,
  onValueChange,
  discountData,
}: DiscountComponentProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(
            "rounded-full border-gray-200 bg-white shadow-sm flex gap-2 truncate text-[8px]",
            value !== "none" &&
              value !== "" &&
              " border-blue-500 text-blue-500",
          )}
        >
          <TicketPercentIcon
            className={cn(
              "w-4 h-4",
              value !== "none" && value !== ""
                ? "text-blue-500"
                : "text-hijaugelap",
            )}
          />
          <SelectValue placeholder="Select a discount" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-gray-100 shadow-xl">
          <SelectGroup>
            <SelectItem
              value="none"
              className="text-[8px] text-gray-400 font-medium truncate"
            >
              No Discount
            </SelectItem>
            {discountData.map((discount: DiscountProps) => (
              <SelectItem
                key={discount.id}
                value={discount.id}
                className="py-3 px-1"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-400 font-medium truncate">
                    {discount.code}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Discount;
