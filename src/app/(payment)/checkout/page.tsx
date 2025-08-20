"use client";

import { ArrowLeft } from "@/lib/icons";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import Payment from "./components/Payment";
import { useAppSelector } from "@/redux/store";
import CheckoutItem from "./components/CheckoutItem";
import { CartDataProps } from "@/types/cart.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Checkout = () => {
  const { cart } = useAppSelector((state) => state.cart);
  return (
    <div className="w-full flex gap-6 flex-col lg:flex-row lg:justify-between">
      <div className="w-full pt-[34px] px-[10px] pb-5 flex flex-col gap-6 bg-white">
        <div className="flex justify-between">
          <Link href={"/neworder/signature"}>
            <Button className="flex gap-[10px] items-center" variant={"ghost"}>
              <Image src={ArrowLeft} alt="Back Icon" />
              <div>Checkout</div>
            </Button>
          </Link>
        </div>
        <ScrollArea className="h-[85vh]">
          {cart.map((item: CartDataProps) => {
            return (
              <CheckoutItem
                key={item.productItem.id}
                image_url={item.productItem.image}
                name={item.productItem.product_name}
                price={item.productItem.price}
                qty={item.qty}
              />
            );
          })}
        </ScrollArea>
      </div>
      <Payment />
    </div>
  );
};

export default Checkout;
