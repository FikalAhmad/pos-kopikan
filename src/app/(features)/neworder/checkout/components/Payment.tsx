"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CashIcon, CeklisIcon, EWalletIcon } from "@/lib/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createPayment } from "@/redux/features/payments/paymentSlice";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { Card } from "@/components/ui/card";
import MidtransPaymentPage from "./MidtransPayment";

const Payment = () => {
  const dispatch = useAppDispatch();
  const { totalPrice } = useAppSelector((state) => state.cart);
  const { success } = useAppSelector((state) => state.payment);
  const { dataOrder } = useAppSelector((state) => state.order);
  const [customerCash, setCustomerCash] = useState<number>(0);
  const [changesTotal, setChangesTotal] = useState<number>(0);

  const router = useRouter();

  const handlePayment = async (paymentMethod: string) => {
    if (dataOrder?.data) {
      await dispatch(
        createPayment({
          order_id: dataOrder.data.id,
          amount: totalPrice,
          status: "pending",
          payment_method: paymentMethod,
        })
      );
      dispatch(removeAllCart());
    } else {
      console.log("data gaada");
    }
    if (success) {
      toast.success(
        <Card className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl w-[300px] h-[300px] justify-center">
          <Image src={CeklisIcon} alt="Check Icon" className="w-24 h-24" />
          <span className="font-semibold text-lg mt-2">Payment Successful</span>
        </Card>,
        {
          action: {
            label: "Back to Dashboard",
            onClick: () => router.push("/dashboard"),
          },
        }
      );
      setTimeout(() => {
        router.push("/dashboard");
      }, 4000);
    }
  };

  return (
    <div className="w-[417px] pt-[34px] px-[20px] pb-5 flex flex-col gap-6 bg-white h-screen shadow-md">
      <div className="flex justify-center">
        <div className="text-base font-bold">Payment</div>
      </div>

      <Tabs defaultValue="cash" className="w-auto mt-[30px]">
        <TabsList className="flex gap-5 bg-transparent mb-[30px]">
          <TabsTrigger
            value="cash"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-white text-sm font-bold p-5 flex flex-col gap-[10px] items-center w-28 hover:bg-hijaugelap hover:text-white bg-[#B8B8B8]"
          >
            <Image
              src={CashIcon}
              alt="Cash Icon"
              width={20}
              className="transition-all data-[state=active]:invert"
            />
            Cash
          </TabsTrigger>
          <TabsTrigger
            value="ewallet"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-white text-sm font-bold p-5 flex flex-col gap-[10px] items-center w-28 hover:bg-hijaugelap hover:text-white bg-[#B8B8B8]"
          >
            <Image
              src={EWalletIcon}
              alt="EWallet Icon"
              width={20}
              className="transition-all data-[state=active]:invert"
            />
            E-Wallet
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cash" className="flex flex-col w-[377px]">
          <div className="flex flex-col items-center h-[65vh]">
            <div className="font-bold text-2xl py-5">Order Summary</div>
            <div className="flex flex-col w-full px-5 mt-5 gap-5">
              <div>
                <div>Subtotal: {totalPrice}</div>
                <div>Discount: -</div>
                <br />
                <div className="font-bold text-lg">Total: {totalPrice}</div>
              </div>
            </div>
          </div>
          <Button
            className="bg-hijaugelap flex justify-between pl-5 pr-[10px] py-3 text-base"
            onClick={() => handlePayment("cash")}
          >
            <div className="font-bold">Rp. {totalPrice}</div>
            <div className="flex gap-[5px] justify-between items-center">
              <span className="font-normal">Pay</span>
              <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
            </div>
          </Button>
        </TabsContent>
        <TabsContent value="ewallet" className="flex flex-col w-[377px]">
          <MidtransPaymentPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payment;
