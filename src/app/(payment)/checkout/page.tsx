"use client";

import { ArrowLeft } from "@/lib/icons";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import Payment from "./components/Payment";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import CheckoutItem from "./components/CheckoutItem";
import { CartDataProps } from "@/types/cart.types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { axiosJWT } from "@/lib/axios";

const Checkout = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { dataOrder } = useAppSelector((state) => state.order);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCancelOrder = async (id: string) => {
    try {
      const response = await axiosJWT.patch(`/api/orders/${id}`, {
        status: "canceled",
      });
      if (response.data) {
        setTimeout(() => {
          router.push("/dashboard");
          dispatch(removeAllCart());
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full flex gap-6 flex-col lg:flex-row lg:justify-between">
      <div className="w-full pt-[34px] px-[10px] pb-5 flex flex-col gap-6 bg-white">
        <div className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex gap-[10px] items-center"
                variant={"ghost"}
              >
                <Image src={ArrowLeft} alt="Back Icon" />
                <div>Checkout</div>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Do you want to cancel your order?</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  className="bg-hijaugelap"
                  onClick={() => handleCancelOrder(dataOrder!.data.id)}
                >
                  Accept
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[80vh]">
          <div className="flex flex-col gap-5">
            {cart.map((item: CartDataProps, idx: number) => {
              return (
                <CheckoutItem
                  key={item.productItem.id + idx}
                  data={item.productItem}
                  qty={item.qty}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <Payment />
    </div>
  );
};

export default Checkout;
