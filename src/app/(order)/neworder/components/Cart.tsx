"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
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
import { ListOrdered, Pencil } from "lucide-react";
import Discount from "./Discount";
import { DiscountProps } from "@/types/discount.types";
import { useFetch } from "@/hooks/api/useFetch";
import { useState } from "react";
import formatPrice from "@/lib/rupiah";
import { TAX_RATE } from "@/constant/payment";
import { usePayment } from "@/hooks/api/usePayment";
import PaymentMethod from "./PaymentMethod";
import { cn } from "@/lib/utils";

const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const { totalPrice } = useAppSelector((state) => state.cart);
  const { dataOrder } = useAppSelector((state) => state.order);
  const { payWithCash, payWithEWallet } = usePayment();
  const discountData = useFetch<DiscountProps[]>(
    ["discounts"],
    "/api/discounts",
  );
  const [selectedDiscountId, setSelectedDiscountId] = useState<string>("none");
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

  const handlePayment = async (paymentMethod: string) => {
    if (!dataOrder?.data.id) return;

    switch (paymentMethod) {
      case "cash":
        await payWithCash(
          dataOrder.data.id,
          totalPaymentAfterTax,
          selectedDiscountId && selectedDiscountId !== "none"
            ? [selectedDiscountId]
            : [],
        );
        setOpenPaymentDialog(false);
        toast.success("Pembayaran Berhasil");
        setTotalCash(0);
        setPaymentMethod("");
        setSelectedDiscountId("none");
        dispatch(removeAllCart());
        break;
      default:
        await payWithEWallet(
          dataOrder.data.id,
          totalPaymentAfterTax,
          paymentMethod,
        );
        break;
    }
  };

  return (
    <div className="flex flex-col justify-between w-[309px] min-w-[309px] max-w-[309px]">
      <div className="flex flex-col p-2 gap-5 bg-white h-screen shadow-md">
        <div className="flex justify-between items-center">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              dispatch(removeAllCart());
            }}
            className="rounded-full bg-gray-100"
          >
            <ListOrdered className="size-4 text-hijaugelap" />
          </Button>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold">Customer Name</span>
            <span className="text-[10px] text-gray-400">Order Number #023</span>
          </div>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              dispatch(removeAllCart());
            }}
            className="rounded-full bg-gray-100"
          >
            <Pencil className="size-4 text-hijaugelap" />
          </Button>
        </div>
        <ScrollArea className="h-full max-h-[calc(100vh-320px)] pr-4">
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
      </div>
      <div className="bg-white flex flex-col gap-3">
        <div className="px-5 py-2">
          <div className="flex justify-between">
            <span className="text-sm">Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs">Discount</span>
              {selectedDiscount && (
                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
                  {selectedDiscount.code}
                </span>
              )}
            </div>
            <span className="text-orange-500">
              {discountValue > 0 ? `- ${formatPrice(discountValue)}` : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs">Tax ({TAX_RATE * 100}%)</span>
            <span>{formatPrice(taxValue)}</span>
          </div>
          {paymentMethod === "cash" && (
            <div className="flex justify-between items-center">
              <span className="text-hijaugelap text-sm">Change</span>
              <span className="text-hijaugelap text-sm">
                {formatPrice(changeAmount)}
              </span>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between">
            <span className="font-bold text-md">Total</span>
            <span className="font-bold text-md">
              {formatPrice(totalPaymentAfterTax)}
            </span>
          </div>
        </div>
        <div className="flex justify-between gap-2 px-4">
          <div className="w-1/2">
            <Discount
              value={selectedDiscountId}
              onValueChange={setSelectedDiscountId}
              discountData={discountData?.data || []}
            />
          </div>
          <Button
            className={cn(
              "w-1/2 rounded-full truncate transition-all",
              paymentMethod
                ? "border-hijaugelap text-hijaugelap"
                : "border-black",
            )}
            variant={"outline"}
            onClick={() => setOpenPaymentDialog(true)}
          >
            {paymentMethod?.toUpperCase() || "Payment Method"}
          </Button>
          <PaymentMethod
            openPaymentDialog={openPaymentDialog}
            setOpenPaymentDialog={setOpenPaymentDialog}
            totalPaymentAfterTax={totalPaymentAfterTax}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            totalCash={totalCash}
            setTotalCash={setTotalCash}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-none w-full" size={"lg"}>
              Process to Payment
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
                onClick={() => handlePayment(paymentMethod)}
              >
                <div className="text-center">Process to Payment</div>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Cart;
