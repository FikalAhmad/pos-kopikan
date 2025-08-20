"use client";

import Image from "next/image";
import { coffeeIcon, kopikanLogo, nonCoffee, signatureIcon } from "@/lib/icons";
import { NavButton } from "../../../../../components/NavButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { removeAllCart } from "@/redux/features/carts/cartSlice";

const SidebarNewOrder = () => {
  const router = useRouter();
  const { dataOrder } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const handleCancelOrder = async (id?: string) => {
    if (!id) {
      setTimeout(() => {
        router.push("/dashboard");
        dispatch(removeAllCart());
      }, 1500);
    } else {
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
    }
  };
  return (
    <div className="w-[130px] h-screen pt-5 flex flex-col gap-3 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"}>
            <ArrowLeft />
            Back
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
              onClick={() => handleCancelOrder(dataOrder?.data.id || "")}
            >
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Image
        src={kopikanLogo}
        alt="Kopikan Logo"
        width={102}
        height={102}
        priority
      />
      <div className="flex flex-col gap-6">
        <NavButton
          href="/neworder/signature"
          icon={signatureIcon}
          label="Signature"
          exactMatch
        />
        <NavButton
          href="/neworder/coffee"
          icon={coffeeIcon}
          label="Coffee"
          exactMatch
        />
        <NavButton
          href="/neworder/noncoffee"
          icon={nonCoffee}
          label="Non Coffee"
          exactMatch
        />
      </div>
    </div>
  );
};

export default SidebarNewOrder;
