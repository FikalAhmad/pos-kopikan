"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CashIcon,
  CeklisIcon,
  DiscountIcon,
  EWalletIcon,
} from "@/lib/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createPayment } from "@/redux/features/payments/paymentSlice";
// import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import CoreMidtransPayment from "./CoreMidtransPayment";
import { usePayment } from "@/hooks/api/usePayment";

const Payment = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { totalPrice } = useAppSelector((state) => state.cart);
  const { success } = useAppSelector((state) => state.payment);
  const { dataOrder } = useAppSelector((state) => state.order);
  // const [discount, setDiscount] = useState<number>();
  const totalPaymentAfterTax = totalPrice + totalPrice * (10 / 100);

  const router = useRouter();

  const { payWithCash, payWithQris } = usePayment();

  const handleCash = async (order_id: string, amount: number) => {
    await payWithCash(order_id, amount);
    if (dataOrder?.data) {
      await dispatch(
        createPayment({
          order_id: dataOrder.data.id,
          amount: totalPrice,
          status: "pending",
          payment_method: "cash",
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
      }, 3000);
    }
  };

  const handleQris = async (
    order_id: string,
    amount: number,
    customer_name: string,
    customer_email: string
  ) => {
    await payWithQris(order_id, amount, customer_name, customer_email);
  };

  // useEffect(() => {
  //   if (payment?.orderId) {
  //     // contoh auto-polling status tiap 10 detik
  //     const interval = setInterval(() => {
  //       checkStatus(payment.orderId);
  //     }, 10000);
  //     return () => clearInterval(interval);
  //   }
  // }, [payment?.orderId]);

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
            onClick={() =>
              handleQris(
                dataOrder!.data.id,
                totalPaymentAfterTax,
                user?.name || "Cashier",
                user?.email || "admin@kopikan.com"
              )
            }
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
              <Select>
                <SelectTrigger className="">
                  <SelectValue
                    placeholder={
                      <span className="flex items-center gap-2">
                        <Image
                          src={DiscountIcon}
                          height={24}
                          width={24}
                          alt="Discount Icon"
                        />
                        Select a Discount
                      </span>
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Discount</SelectLabel>
                    <SelectItem value="apple">Promo New User (10%)</SelectItem>
                    <SelectItem value="banana">Promo Buy 1 Get 1</SelectItem>
                    <SelectItem value="blueberry">
                      Promo Evening Summer
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Subtotal</div>
                <div className="font-bold">{totalPrice}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Discount</div>
                <div className="font-bold">-</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Tax(10%)</div>
                <div className="font-bold">{totalPrice * (10 / 100)}</div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Total Payment</div>
                <div className="font-bold">{totalPaymentAfterTax}</div>
              </div>
            </div>
          </div>
          <Button
            className="bg-hijaugelap flex justify-between pl-5 pr-[10px] py-3 text-base"
            onClick={() => handleCash(dataOrder!.data.id, totalPaymentAfterTax)}
          >
            <div className="font-bold">Rp. {totalPaymentAfterTax}</div>
            <div className="flex gap-[5px] justify-between items-center">
              <span className="font-normal">Pay</span>
              <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
            </div>
          </Button>
        </TabsContent>
        <TabsContent value="ewallet" className="flex flex-col w-[377px]">
          <CoreMidtransPayment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payment;
