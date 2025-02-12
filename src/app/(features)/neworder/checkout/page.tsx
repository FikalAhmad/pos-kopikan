import { ArrowLeft, TrashIcon } from "@/lib/icons";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "../[category]/components/CartItem";
import Payment from "./components/Payment";

const Checkout = () => {
  return (
    <div className="w-full flex gap-6 flex-col lg:flex-row">
      <div className="w-[417px] pt-[34px] px-[10px] pb-5 flex flex-col gap-6 bg-white">
        <div className="flex justify-between">
          <div className="flex gap-[10px] items-center">
            <Image src={ArrowLeft} alt="Back Icon" />
            <div>Checkout</div>
          </div>
          <Image src={TrashIcon} alt="Delete Icon" />
        </div>
        <ScrollArea className="h-[85vh]">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </ScrollArea>
      </div>
      <Payment />
    </div>
  );
};

export default Checkout;
