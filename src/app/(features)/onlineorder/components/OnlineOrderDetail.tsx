import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight } from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";

const OnlineOrderDetail = () => {
  // { orderId }: { orderId: string }
  // nanti kasih props ini
  return (
    <div className="flex flex-col py-[34px] px-[10px] gap-5 w-[309px] bg-white h-screen shadow-md">
      <div className="flex flex-col gap-5 justify-between">
        <div className="text-xl">
          <strong>Order</strong> #2240
        </div>
        <div className="flex justify-between mr-10">
          <div>Item</div>
          <div>Qty</div>
        </div>
      </div>
      <ScrollArea className="h-[90vh]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-between shadow-sm">
            <div className="flex justify-between mr-[10px] w-[239px] text-sm font-medium min-h-10">
              <div>Butterscotch Sea Salt Latte</div>
              <div>1</div>
            </div>
            <div>
              <Checkbox />
            </div>
          </div>
          <div className="flex justify-between shadow-sm">
            <div className="flex justify-between mr-[10px] w-[239px] text-sm font-medium min-h-10">
              <div>Butterscotch Sea Salt Latte</div>
              <div>1</div>
            </div>
            <div>
              <Checkbox />
            </div>
          </div>
          <div className="flex justify-between shadow-sm">
            <div className="flex justify-between mr-[10px] w-[239px] text-sm font-medium min-h-10">
              <div>Butterscotch Sea Salt Latte</div>
              <div>1</div>
            </div>
            <div>
              <Checkbox />
            </div>
          </div>
          <div className="flex justify-between shadow-sm">
            <div className="flex justify-between mr-[10px] w-[239px] text-sm font-medium min-h-10">
              <div>Butterscotch Sea Salt Latte</div>
              <div>1</div>
            </div>
            <div>
              <Checkbox />
            </div>
          </div>
          <div className="flex justify-between shadow-sm">
            <div className="flex justify-between mr-[10px] w-[239px] text-sm font-medium min-h-10">
              <div>Butterscotch Sea Salt Latte</div>
              <div>1</div>
            </div>
            <div>
              <Checkbox />
            </div>
          </div>
        </div>
      </ScrollArea>
      <Button className="bg-hijaugelap" asChild>
        <Link
          href="/neworder/checkout"
          className="flex justify-between pl-5 pr-[10px] py-3 text-base"
        >
          <div className="font-bold">Rp.200.000.000</div>
          <div className="flex gap-[5px] justify-between items-center">
            <span className="font-normal">Pay</span>
            <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default OnlineOrderDetail;
