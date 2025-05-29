"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrashIcon } from "@/lib/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createOrder } from "@/redux/features/orders/orderSlice";
// import { useRouter } from "next/navigation";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { CartDataProps } from "@/types/cart.types";

const Cart = () => {
  // const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const handleCheckout = () => {
    const cartItem = cart.map((item) => ({
      product_id: item.productItem.id,
      qty: item.qty,
    }));
    if (!user) {
      throw new Error("User not found");
    }
    const { id } = user;
    dispatch(
      createOrder({
        customer_id: id,
        order_type: "dine-in",
        order_source: "offline",
        order_items: cartItem,
        total: totalPrice,
        status: "pending",
      })
    );
  };

  return (
    <div className="flex flex-col py-[34px] px-[10px] gap-5 w-[309px] bg-white h-screen shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl">
          <strong>New</strong> Order
        </div>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            dispatch(removeAllCart());
          }}
        >
          <Image src={TrashIcon} alt="Delete Icon" />
        </Button>
      </div>
      <ScrollArea className="h-[90vh]">
        {cart.map((item: CartDataProps) => {
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
      <Button
        className="bg-hijaugelap flex justify-between"
        onClick={() => handleCheckout()}
      >
        <div className="font-bold">Rp. {totalPrice}</div>
        <div className="flex gap-[5px] justify-between items-center">
          <span className="font-normal">Pay</span>
          <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
        </div>
      </Button>
    </div>
  );
};

export default Cart;
