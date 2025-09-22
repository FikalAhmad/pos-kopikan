"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, DiscountIcon } from "@/lib/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  createPayment,
  removePaymentAfterPaid,
} from "@/redux/features/payments/paymentSlice";
// import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Payment = () => {
  const dispatch = useAppDispatch();
  const { totalPrice } = useAppSelector((state) => state.cart);
  const { data: PaymentData } = useAppSelector((state) => state.payment);
  const { dataOrder } = useAppSelector((state) => state.order);
  // const [discount, setDiscount] = useState<number>();
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalCash, setTotalCash] = useState(0);

  const totalPaymentAfterTax = totalPrice + totalPrice * (10 / 100);

  const router = useRouter();

  const { payWithCash, payWithEWallet } = usePayment();

  const handleChoosePayment = async ({
    order_id,
    amount,
    paymentMethod,
  }: {
    order_id: string;
    amount: number;
    paymentMethod: string;
  }) => {
    if (paymentMethod !== "cash") {
      await payWithEWallet(order_id, amount, paymentMethod);
      dispatch(removeAllCart());
    } else {
      await payWithCash(order_id, amount);
      if (dataOrder?.data) {
        await dispatch(
          createPayment({
            order_id: dataOrder.data.id,
            amount: totalPrice,
            status: "PENDING",
            payment_method: "CASH",
          })
        );
      }
    }
  };

  // const handleCash = async (order_id: string, amount: number) => {
  //   await payWithCash(order_id, amount);
  //   if (dataOrder?.data) {
  //     await dispatch(
  //       createPayment({
  //         order_id: dataOrder.data.id,
  //         amount: totalPrice,
  //         status: "pending",
  //         payment_method: "cash",
  //       })
  //     );
  //     dispatch(removeAllCart());
  //   } else {
  //     console.log("data gaada");
  //   }
  //   if (success) {
  //     toast.success(
  //       <Card className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl w-[300px] h-[300px] justify-center">
  //         <Image src={CeklisIcon} alt="Check Icon" className="w-24 h-24" />
  //         <span className="font-semibold text-lg mt-2">Payment Successful</span>
  //       </Card>,
  //       {
  //         action: {
  //           label: "Back to Dashboard",
  //           onClick: () => router.push("/dashboard"),
  //         },
  //       }
  //     );
  //     setTimeout(() => {
  //       router.push("/dashboard");
  //     }, 3000);
  //   }
  // };

  // const handleQris = async (
  //   order_id: string,
  //   amount: number,
  //   customer_name: string,
  //   customer_email: string
  // ) => {
  //   await payWithQris(order_id, amount, customer_name, customer_email);
  // };

  console.log(totalCash);

  return (
    <div className="w-full max-w-[417px] pt-[34px] px-[20px] pb-5 flex flex-col gap-6 bg-white h-screen shadow-md justify-between">
      <div className="flex flex-col items-center h-[65vh]">
        <div className="font-bold text-2xl py-5">Order Summary</div>

        {PaymentData?.qrUrl ? (
          <CoreMidtransPayment />
        ) : (
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
              <div className="text-gray-500">-</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Tax(10%)</div>
              <div className=" text-gray-500">{totalPrice * (10 / 100)}</div>
            </div>
            <Separator />
            {totalCash > 0 ? (
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Amount</div>
                <div className="text-gray-500">
                  {totalCash - totalPaymentAfterTax}
                </div>
              </div>
            ) : null}
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Total Payment</div>
              <div className="font-bold">{totalPaymentAfterTax}</div>
            </div>
          </div>
        )}
      </div>
      {!PaymentData?.qrUrl ? (
        totalCash ? (
          <Button
            className="bg-hijaugelap flex justify-between pl-5 pr-[10px] py-3 text-base"
            onClick={() => {
              setTimeout(() => {
                dispatch(removeAllCart());
                dispatch(removePaymentAfterPaid());
                router.push("/dashboard");
              }, 2000);
            }}
          >
            <div className="font-bold">Rp. {totalPaymentAfterTax}</div>
            <div className="flex gap-[5px] justify-between items-center">
              <span className="font-normal">Pay</span>
              <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
            </div>
          </Button>
        ) : (
          <Button
            onClick={() => {
              setOpenPaymentDialog(true);
            }}
          >
            Choose Payment Method
          </Button>
        )
      ) : null}
      <Dialog open={openPaymentDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Payment Method</DialogTitle>
          </DialogHeader>
          <Tabs
            value={paymentMethod}
            onValueChange={(v) => {
              setPaymentMethod(v);
            }}
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="font-semibold">Cash</div>
                <div className="flex flex-wrap gap-3 text-hijaugelap">
                  <Button
                    variant={"outline"}
                    className="border-hijaugelap"
                    onClick={() => setTotalCash(totalCash + 10000)}
                  >
                    Rp. 10000
                  </Button>
                  <Button
                    variant={"outline"}
                    className="border-hijaugelap"
                    onClick={() => setTotalCash(totalCash + 50000)}
                  >
                    Rp. 50000
                  </Button>
                  <Button
                    variant={"outline"}
                    className="border-hijaugelap"
                    onClick={() => setTotalCash(totalCash + 100000)}
                  >
                    Rp. 100000
                  </Button>
                  <Input
                    placeholder="Rp. 29000"
                    type="number"
                    className="border-hijaugelap"
                    onChange={(e) => {
                      setTotalCash(e.target.valueAsNumber);
                      setPaymentMethod("cash");
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="font-semibold">E-Wallet</div>

                <TabsList className="grid grid-cols-2 gap-2 h-max bg-white">
                  <TabsTrigger
                    value="gopay"
                    className="flex items-center justify-center px-3 py-2 text-sm flex-1 border-[1px] border-hijaugelap text-hijaugelap rounded-md data-[state=active]:bg-hijaugelap data-[state=active]:text-white"
                  >
                    GOPAY
                  </TabsTrigger>
                  <TabsTrigger
                    value="ovo"
                    className="flex items-center justify-center px-3 py-2 text-sm flex-1 border-[1px] border-hijaugelap text-hijaugelap rounded-md data-[state=active]:bg-hijaugelap data-[state=active]:text-white"
                  >
                    OVO
                  </TabsTrigger>
                  <TabsTrigger
                    value="dana"
                    className="flex items-center justify-center px-3 py-2 text-sm flex-1 border-[1px] border-hijaugelap text-hijaugelap rounded-md data-[state=active]:bg-hijaugelap data-[state=active]:text-white"
                  >
                    DANA
                  </TabsTrigger>
                  <TabsTrigger
                    value="linkaja"
                    className="flex items-center justify-center px-3 py-2 text-sm flex-1 border-[1px] border-hijaugelap text-hijaugelap rounded-md data-[state=active]:bg-hijaugelap data-[state=active]:text-white"
                  >
                    LINKAJA
                  </TabsTrigger>
                  <TabsTrigger
                    value="shopeepay"
                    className="flex items-center justify-center px-3 py-2 text-sm flex-1 border-[1px] border-hijaugelap text-hijaugelap rounded-md data-[state=active]:bg-hijaugelap data-[state=active]:text-white"
                  >
                    SHOPEEPAY
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex flex-col gap-3">
                <div className="font-semibold">Other</div>

                <TabsList className="grid grid-cols-2 flex-wrap gap-3 w-full h-max bg-white">
                  <TabsTrigger
                    value="qris"
                    className="flex items-center justify-center px-3 py-2 text-sm flex-1 border-[1px] border-hijaugelap text-hijaugelap rounded-md data-[state=active]:bg-hijaugelap data-[state=active]:text-white"
                  >
                    QRIS
                  </TabsTrigger>
                  <TabsTrigger
                    value=""
                    className="flex items-center justify-center px-3 py-2 text-sm flex-1 border-[1px] border-hijaugelap text-hijaugelap rounded-md data-[state=active]:bg-hijaugelap data-[state=active]:text-white"
                  >
                    Bank Transfer
                  </TabsTrigger>
                  <TabsTrigger
                    value=""
                    className="flex items-center justify-center px-3 py-2 text-sm flex-1 border-[1px] border-hijaugelap text-hijaugelap rounded-md data-[state=active]:bg-hijaugelap data-[state=active]:text-white"
                  >
                    BCA QR
                  </TabsTrigger>
                </TabsList>
              </div>
              <Button
                className="bg-hijaugelap"
                onClick={() => {
                  handleChoosePayment({
                    order_id: dataOrder!.data.id,
                    amount: totalPaymentAfterTax,
                    paymentMethod: paymentMethod,
                  });
                  setOpenPaymentDialog(false);
                }}
              >
                Pay
              </Button>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
