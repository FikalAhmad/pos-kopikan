"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrashIcon } from "@/lib/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createOrder } from "@/redux/features/orders/orderSlice";
import { useRouter } from "next/navigation";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { CartDataProps } from "@/types/cart.types";
import { toast } from "sonner";
import formatPrice from "@/lib/rupiah";

const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const handleCheckout = () => {
    const cartItem = cart?.map((item: CartDataProps) => ({
      product_id: item.productItem.id,
      qty: item.qty,
      options: item.productItem.options,
    }));
    if (!user) {
      throw new Error("User not found");
    }
    if (cartItem.length <= 0) {
      toast.error("Produk Belum Ditambahkan");
    } else {
      const { id } = user;
      dispatch(
        createOrder({
          customer_id: id,
          order_source: "OFFLINE",
          order_items: cartItem,
        })
      );
      router.push("/checkout");
    }
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
        <div className="flex flex-col gap-5">
          {cart?.map((item: CartDataProps, idx: number) => {
            return (
              <CartItem
                key={item.productItem.id + idx}
                data={item.productItem}
                qty={item.qty}
              />
            );
          })}
        </div>
      </ScrollArea>
      <Button
        className="bg-hijaugelap flex justify-between"
        onClick={() => handleCheckout()}
      >
        <div className="font-bold">{formatPrice(totalPrice)}</div>
        <div className="flex gap-[5px] justify-between items-center">
          <span className="font-normal">Pay</span>
          <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
        </div>
      </Button>
    </div>
  );
};

export default Cart;
