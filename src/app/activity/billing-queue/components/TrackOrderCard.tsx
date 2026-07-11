import { Separator } from "@/components/ui/separator";

const TrackOrderCard = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-2 w-44">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="text-lg">Mike</div>
          <div className="text-xs text-gray-500">Table 04 - Dine In</div>
          <div className="text-xs text-gray-500">10.00 AM</div>
        </div>
        <div className="text-[4px] px-2 py-1 bg-hijaugelap/20 rounded-full text-hijaugelap">
          All Done
        </div>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-2">
        <div className="text-xs text-gray-500">2x Matcha Latte</div>
        <div className="text-xs text-gray-500">1x Aren Latte</div>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between">
        <div className="text-xs">Total Order</div>
        <div className="text-xs">3 Items</div>
      </div>
    </div>
  );
};

export default TrackOrderCard;
