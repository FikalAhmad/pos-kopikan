"use client";

import { ArrowLeft, TrashIcon } from "@/lib/icons";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "../[category]/components/CartItem";
import Payment from "./components/Payment";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Cart } from "@/types/order.type";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.checkoutFlow);
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
          {cart.map((item: Cart) => {
            return (
              <CartItem
                key={item.productItem.id}
                id={item.productItem.id}
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
