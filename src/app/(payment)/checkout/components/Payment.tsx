"use client";

import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { usePayment } from "@/hooks/api/usePayment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { lazy, Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/api/useFetch";
import { Card, CardContent } from "@/components/ui/card";
import formatPrice from "@/lib/rupiah";
import { removeOrder } from "@/redux/features/orders/orderSlice";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Wallet,
  Banknote,
  QrCode,
  CreditCard,
  Receipt,
  TicketPercent,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DanaIcon,
  GopayIcon,
  OvoIcon,
  QrisIcon,
  ShopeePayIcon,
} from "@/lib/icons";
import Image from "next/image";

// Constants
const TAX_RATE = 0.1;

export type DiscountProps = {
  id: string;
  code: string;
  description: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  max_discount?: number | null;
  min_purchase?: number | null;
  is_active: boolean;
};

const CoreMidtransPayment = lazy(() => import("./CoreMidtransPayment"));

const Payment = () => {
  // --- Hooks & Redux ---
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { totalPrice } = useAppSelector((state) => state.cart);
  const { data: PaymentData } = useAppSelector((state) => state.payment);
  const { dataOrder } = useAppSelector((state) => state.order);
  const { payWithCash, payWithEWallet } = usePayment();
  const discountData = useFetch<DiscountProps[]>(
    ["discounts"],
    "/api/discounts",
  );

  // --- State ---
  const [selectedDiscountId, setSelectedDiscountId] = useState<string | null>(
    null,
  );
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [totalCash, setTotalCash] = useState(0);

  // --- Calculations ---
  const selectedDiscount = discountData.data?.find(
    (d) => d.id === selectedDiscountId,
  );

  let discount = 0;
  if (selectedDiscount) {
    if (
      !selectedDiscount.min_purchase ||
      totalPrice >= selectedDiscount.min_purchase
    ) {
      if (selectedDiscount.type === "PERCENTAGE") {
        discount = Math.floor((totalPrice * selectedDiscount.value) / 100);
        if (
          selectedDiscount.max_discount &&
          discount > selectedDiscount.max_discount
        ) {
          discount = selectedDiscount.max_discount;
        }
      } else {
        discount = selectedDiscount.value;
      }
    }
  }
  const discountValue = discount;
  const totalAfterDiscount = Math.max(0, totalPrice - discount);

  const taxValue = totalAfterDiscount * TAX_RATE;

  const totalPaymentAfterTax = totalAfterDiscount + taxValue;

  const changeAmount = Math.max(0, totalCash - totalPaymentAfterTax);
  const remainingAmount = Math.max(0, totalPaymentAfterTax - totalCash);
  const isPaymentComplete =
    paymentMethod === "cash"
      ? totalCash >= totalPaymentAfterTax
      : !!paymentMethod;

  // --- Handlers ---
  const handleChoosePayment = async () => {
    if (!dataOrder?.data.id) return;

    if (paymentMethod !== "cash") {
      await payWithEWallet(
        dataOrder.data.id,
        totalPaymentAfterTax,
        paymentMethod,
      );
    } else {
      await payWithCash(
        dataOrder.data.id,
        totalPaymentAfterTax,
        selectedDiscountId && selectedDiscountId !== "none"
          ? [selectedDiscountId]
          : [],
      );
    }
  };

  const handleSuccessPayment = () => {
    toast("", {
      description: (
        <Card className="flex flex-col items-center p-8 bg-white shadow-2xl rounded-3xl w-[320px] border-none">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="font-bold text-2xl text-gray-800">Success!</h3>
          <p className="text-gray-500 text-center mt-2">
            Payment has been processed successfully.
          </p>
        </Card>
      ),
      className:
        "fixed flex items-center justify-center bg-transparent border-none shadow-none p-0",
      position: "top-center",
      duration: 2000,
    });

    setTimeout(() => {
      router.push("/dashboard");
      dispatch(removeAllCart({ silent: true }));
      dispatch(removeOrder());
    }, 2000);
  };

  return (
    <div className="w-full max-w-[420px] bg-gray-50 h-screen flex flex-col shadow-2xl border-l">
      {/* Header Section */}
      <div className="bg-white p-6 pt-10 border-b flex flex-col gap-1">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Order Payment
        </h1>
        <p className="text-gray-400 text-sm font-medium">
          Please review and process the transaction
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 flex flex-col gap-6">
          {PaymentData?.qrUrl ? (
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
              <Suspense
                fallback={
                  <div className="h-64 flex items-center justify-center text-gray-400 animate-pulse">
                    Loading payment details...
                  </div>
                }
              >
                <CoreMidtransPayment />
              </Suspense>
            </div>
          ) : (
            <>
              {/* Summary Card */}
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                <div className="bg-hijaugelap p-6 text-white">
                  <div className="flex items-center gap-2 opacity-80 mb-1">
                    <Receipt className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Total Payable
                    </span>
                  </div>
                  <div className="text-3xl font-black">
                    {formatPrice(totalPaymentAfterTax)}
                  </div>
                </div>
                <CardContent className="p-6 bg-white flex flex-col gap-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">Subtotal</span>
                    <span className="text-gray-700 font-bold">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-medium">
                        Discount
                      </span>
                      {selectedDiscount && (
                        <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {selectedDiscount.code}
                        </span>
                      )}
                    </div>
                    <span className="text-orange-500 font-bold">
                      {discountValue > 0
                        ? `- ${formatPrice(discountValue)}`
                        : "—"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">Tax (10%)</span>
                    <span className="text-gray-700 font-bold">
                      {formatPrice(taxValue)}
                    </span>
                  </div>

                  {totalCash > 0 && (
                    <>
                      <Separator className="bg-gray-100" />
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 font-medium">
                          Amount Paid
                        </span>
                        <span className="text-gray-700 font-bold">
                          {formatPrice(totalCash)}
                        </span>
                      </div>
                      {totalCash >= totalPaymentAfterTax ? (
                        <div className="flex justify-between items-center">
                          <span className="text-hijaugelap font-bold">
                            Change
                          </span>
                          <span className="text-hijaugelap text-lg font-black">
                            {formatPrice(changeAmount)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="text-red-500 font-bold">
                            Remaining
                          </span>
                          <span className="text-red-500 text-lg font-black">
                            {formatPrice(remainingAmount)}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Discount Selector */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-1">
                  <TicketPercent className="w-4 h-4 text-hijaugelap" />
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Available Voucher
                  </span>
                </div>
                <Select
                  value={selectedDiscountId || ""}
                  onValueChange={setSelectedDiscountId}
                >
                  <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-white shadow-sm focus:ring-hijaugelap transition-all">
                    <SelectValue placeholder="Select a discount" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-gray-100 shadow-xl">
                    <SelectGroup>
                      <SelectItem value="none" className="text-gray-400">
                        No Discount
                      </SelectItem>
                      {discountData.data?.map((discount: DiscountProps) => (
                        <SelectItem
                          key={discount.id}
                          value={discount.id}
                          className="py-3"
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800">
                              {discount.description}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              Code: {discount.code}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-6 bg-white border-t border-gray-100 flex flex-col gap-3">
        {!PaymentData?.qrUrl && (
          <>
            {isPaymentComplete ? (
              <Button
                className="w-full h-16 bg-hijaugelap hover:bg-hijaugelap/90 text-white rounded-2xl shadow-xl shadow-hijaugelap/20 transition-all active:scale-[0.98] flex items-center justify-between px-6"
                onClick={handleSuccessPayment}
              >
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                    Confirm Payment
                  </span>
                  <span className="text-xl font-black">
                    {formatPrice(totalPaymentAfterTax)}
                  </span>
                </div>
                <div className="bg-white/20 p-2 rounded-xl">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </Button>
            ) : (
              <Button
                className="w-full h-16 bg-white border-2 border-hijaugelap text-hijaugelap hover:bg-hijaugelap/5 rounded-2xl font-bold text-lg transition-all"
                onClick={() => setOpenPaymentDialog(true)}
              >
                {totalCash > 0 || paymentMethod
                  ? "Complete Payment"
                  : "Choose Payment Method"}
              </Button>
            )}

            {(totalCash > 0 || paymentMethod) && (
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest h-auto p-0"
                onClick={() => {
                  setPaymentMethod("");
                  setTotalCash(0);
                  setOpenPaymentDialog(true);
                }}
              >
                Change Payment Method
              </Button>
            )}
          </>
        )}
      </div>
      <Dialog open={openPaymentDialog} onOpenChange={setOpenPaymentDialog}>
        <DialogContent className="bg-white p-0 overflow-hidden max-w-[450px] rounded-2xl border-none">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Payment Method
            </DialogTitle>
            <DialogDescription>
              Select how you would like to pay for this order.
            </DialogDescription>
            <div className="mt-4 p-4 bg-hijaugelap/5 rounded-xl flex justify-between items-center border border-hijaugelap/10">
              <span className="text-gray-500 font-medium">Total Amount</span>
              <span className="text-xl font-bold text-hijaugelap">
                {formatPrice(totalPaymentAfterTax)}
              </span>
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] px-6">
            <div className="flex flex-col gap-8 pb-6">
              {/* Cash Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Banknote className="w-5 h-5 text-hijaugelap" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Cash Payment
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Fast Cash Selection */}
                  {[10000, 20000, 50000, 100000].map((amt) => (
                    <Button
                      key={amt}
                      variant="outline"
                      className={cn(
                        "h-12 border-gray-200 hover:border-hijaugelap hover:bg-hijaugelap/5 text-gray-600 transition-all",
                        paymentMethod === "cash" &&
                          totalCash === amt &&
                          "border-hijaugelap bg-hijaugelap/5 text-hijaugelap ring-1 ring-hijaugelap",
                      )}
                      onClick={() => {
                        setTotalCash((prev) => prev + amt);
                        setPaymentMethod("cash");
                      }}
                    >
                      +{formatPrice(amt).replace("Rp", "").trim()}
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    Rp
                  </span>
                  <Input
                    placeholder="Enter custom amount"
                    type="number"
                    className="pl-10 h-12 border-gray-200 focus-visible:ring-hijaugelap"
                    value={totalCash || ""}
                    onChange={(e) => {
                      setTotalCash(e.target.valueAsNumber || 0);
                      setPaymentMethod("cash");
                    }}
                  />
                </div>
              </section>

              {/* Digital Payment Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="w-5 h-5 text-hijaugelap" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                    E-Wallet & Digital
                  </h3>
                </div>

                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "gopay", label: "GOPAY", icon: GopayIcon },
                        { id: "ovo", label: "OVO", icon: OvoIcon },
                        { id: "dana", label: "DANA", icon: DanaIcon },
                        {
                          id: "shopeepay",
                          label: "SHOPEEPAY",
                          icon: ShopeePayIcon,
                        },
                        { id: "qris", label: "QRIS", icon: QrisIcon },
                      ].map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={cn(
                            "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                            paymentMethod === method.id
                              ? "border-hijaugelap bg-hijaugelap/5 shadow-md"
                              : "border-gray-100 hover:border-gray-200 bg-white",
                          )}
                        >
                          {paymentMethod === method.id && (
                            <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-hijaugelap" />
                          )}
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center text-white text-[10px] font-bold mb-2",
                            )}
                          >
                            <Image
                              src={method.icon}
                              alt={method.label}
                              width={40}
                              height={40}
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                          <span
                            className={cn(
                              "text-[10px] font-black tracking-tighter",
                              paymentMethod === method.id
                                ? "text-hijaugelap"
                                : "text-gray-500",
                            )}
                          >
                            {method.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <CreditCard className="w-5 h-5 text-hijaugelap" />
                      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Bank Transfer
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "banktransfer", label: "Bank Transfer" },
                        { id: "bcaqr", label: "BCA QR" },
                      ].map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={cn(
                            "relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200",
                            paymentMethod === method.id
                              ? "border-hijaugelap bg-hijaugelap/5 shadow-md"
                              : "border-gray-100 hover:border-gray-200 bg-white",
                          )}
                        >
                          <QrCode
                            className={cn(
                              "w-5 h-5",
                              paymentMethod === method.id
                                ? "text-hijaugelap"
                                : "text-gray-400",
                            )}
                          />
                          <span
                            className={cn(
                              "text-xs font-bold",
                              paymentMethod === method.id
                                ? "text-hijaugelap"
                                : "text-gray-500",
                            )}
                          >
                            {method.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tabs>
              </section>
            </div>
          </ScrollArea>

          <div className="p-6 border-t bg-gray-50 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 border-gray-300"
              onClick={() => setOpenPaymentDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-[2] h-12 bg-hijaugelap hover:bg-hijaugelap/90 text-white font-bold text-lg shadow-lg shadow-hijaugelap/20 transition-all active:scale-95 disabled:opacity-50"
              disabled={
                !paymentMethod ||
                (paymentMethod === "cash" && totalCash < totalPaymentAfterTax)
              }
              onClick={() => {
                handleChoosePayment();
                setOpenPaymentDialog(false);
              }}
            >
              Process Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
