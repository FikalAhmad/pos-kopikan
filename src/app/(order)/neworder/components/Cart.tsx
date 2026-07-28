"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { selectCartTotals } from "@/redux/features/carts/cartSelectors";
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
import Discount from "./Discount";
import { DiscountProps } from "@/types/discount.types";
import { useFetch } from "@/hooks/api/useFetch";
import { useState } from "react";
import formatPrice from "@/lib/rupiah";
import { TAX_RATE } from "@/constant/payment";
import PaymentMethod from "./PaymentMethod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
} from "@/redux/features/api/ordersApi";
import { TableResponse } from "@/types/order.type";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const { data: orders } = useGetAllOrdersQuery();
  const discountData = useFetch<DiscountProps[]>(
    ["discounts"],
    "/api/discounts",
  );
  const { data: tableList } = useFetch<TableResponse[]>(
    ["tables"],
    "/api/tables",
  );

  const [selectedTableId, setSelectedTableId] = useState<string>("");
  const [selectedOrderType, setSelectedOrderType] =
    useState<string>("TAKE_AWAY");
  const [selectedDiscountId, setSelectedDiscountId] = useState<string>("none");
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [totalCash, setTotalCash] = useState(0);
  const [customerName, setCustomerName] = useState<string>("");

  const selectedDiscount = discountData.data?.find(
    (d) => d.id === selectedDiscountId,
  );

  const { discountValue, taxValue, totalPaymentAfterTax, changeAmount } =
    useAppSelector((state) =>
      selectCartTotals(state, selectedDiscount, totalCash),
    );

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleCheckout = async () => {
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
      await createOrder({
        customer_name: customerName,
        table_id: selectedTableId,
        shift_id: user.id,
        order_source: "CASHIER",
        order_type: selectedOrderType.toUpperCase(),
        total: totalPaymentAfterTax,
        payment_method: paymentMethod.toUpperCase(),
        discounts:
          selectedDiscountId && selectedDiscountId !== "none"
            ? [selectedDiscountId]
            : [],
        order_items: cartItem,
      });
    }
  };

  const isFormValid =
    cart.length > 0 &&
    Boolean(paymentMethod) &&
    Boolean(selectedOrderType) &&
    (selectedOrderType !== "DINE_IN" || Boolean(selectedTableId)) &&
    (paymentMethod !== "cash" || totalCash >= totalPaymentAfterTax);

  const nextOrderSeq = (orders?.data?.length || 0) + 1;
  const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const currentOrderNumber = `ORD-${todayStr}-${String(nextOrderSeq).padStart(4, "0")}`;

  return (
    <div className="flex flex-col justify-between w-[309px] min-w-[309px] max-w-[309px]">
      <div className="flex flex-col p-2 gap-3 bg-white h-screen shadow-md">
        <div className="flex flex-col items-center">
          <Input
            className="text-sm font-bold border-none focus-visible:ring-0 text-center shadow-none"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <span className="text-[10px] text-gray-400">
            Order Number {currentOrderNumber}
          </span>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <Select value={selectedTableId} onValueChange={setSelectedTableId}>
            <SelectTrigger
              className="rounded-full text-xs"
              disabled={selectedOrderType === "TAKE_AWAY"}
            >
              <SelectValue placeholder="Select Table" />
            </SelectTrigger>
            <SelectContent className="text-xs">
              {tableList?.map((item: TableResponse) => (
                <SelectItem key={item.id} value={item.id} className="text-xs">
                  {item.table_number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedOrderType}
            onValueChange={(val) => {
              setSelectedOrderType(val);
              if (val === "TAKE_AWAY") setSelectedTableId("");
            }}
          >
            <SelectTrigger className="rounded-full text-xs">
              <SelectValue placeholder="Order Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DINE_IN" className="text-xs">
                Dine In
              </SelectItem>
              <SelectItem value="TAKE_AWAY" className="text-xs">
                Takeaway
              </SelectItem>
            </SelectContent>
          </Select>
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
            <Button
              className="rounded-none w-full"
              size={"lg"}
              disabled={!isFormValid}
            >
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
                onClick={() => handleCheckout()}
              >
                <div className="text-center">
                  {isLoading ? "Processing ..." : "Process to Payment"}
                </div>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Cart;
