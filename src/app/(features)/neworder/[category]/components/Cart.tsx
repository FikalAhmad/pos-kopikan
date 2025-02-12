import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrashIcon } from "@/lib/icons";
import Link from "next/link";

const Cart = () => {
  return (
    <div className="flex flex-col py-[34px] px-[10px] gap-5 w-[309px] bg-white h-screen shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl">
          <strong>New</strong> Order
        </div>
        <Image src={TrashIcon} alt="Delete Icon" />
      </div>
      <ScrollArea className="h-[90vh]">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
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

export default Cart;
