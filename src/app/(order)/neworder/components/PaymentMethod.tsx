import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Wallet,
  QrCode,
  CreditCard,
  Banknote,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import {
  DanaIcon,
  GopayIcon,
  OvoIcon,
  QrisIcon,
  ShopeePayIcon,
} from "@/lib/icons";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import formatPrice from "@/lib/rupiah";

type Props = {
  openPaymentDialog: boolean;
  setOpenPaymentDialog: (open: boolean) => void;
  totalPaymentAfterTax: number;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  totalCash: number;
  setTotalCash: React.Dispatch<React.SetStateAction<number>>;
};

const PaymentMethod = ({
  openPaymentDialog,
  setOpenPaymentDialog,
  totalPaymentAfterTax,
  paymentMethod,
  setPaymentMethod,
  totalCash,
  setTotalCash,
}: Props) => {
  return (
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
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Banknote className="w-5 h-5 text-hijaugelap" />
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Cash Payment
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
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
            className="flex-[2] h-12 bg-hijaugelap hover:bg-hijaugelap/90 text-white font-bold text-lg shadow-lg shadow-hijaugelap/20 transition-all active:scale-95 disabled:opacity-50"
            disabled={
              !paymentMethod ||
              (paymentMethod === "cash" && totalCash < totalPaymentAfterTax)
            }
            onClick={() => {
              setOpenPaymentDialog(false);
            }}
          >
            Choose Payment Method
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethod;
