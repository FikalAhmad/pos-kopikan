"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@/lib/icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createOrder } from "@/redux/features/orders/orderSlice";
import { useRouter } from "next/navigation";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { CartDataProps } from "@/types/cart.types";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
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
        }),
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
          <Image src={TrashIcon} alt="Delete Icon" unoptimized />
        </Button>
      </div>
      <ScrollArea className="h-full pr-4">
        <div className="flex flex-col gap-5">
          {cart?.map((item: CartDataProps, idx: number) => {
            return (
              <>
                <CartItem
                  key={item.productItem.id + idx}
                  data={item.productItem}
                  qty={item.qty}
                />
                <Separator />
              </>
            );
          })}
        </div>
      </ScrollArea>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <div className="text-center font-bold">Process to Payment</div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[320px] bg-white p-6 rounded-2xl border-none shadow-2xl">
          <DialogHeader className="flex flex-col items-center gap-2">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Process to Payment?
            </DialogTitle>
            <p className="text-sm text-gray-500 text-center">
              Are you sure you want to process to payment?
            </p>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <DialogClose asChild>
              <Button className="flex-1 rounded-xl h-11" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="flex-1 text-white rounded-xl h-11 transition-colors"
              onClick={handleCheckout}
            >
              <div className="text-center font-bold">Process to Payment</div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
