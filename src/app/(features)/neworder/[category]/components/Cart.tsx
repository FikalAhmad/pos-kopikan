import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrashIcon } from "@/lib/icons";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Product } from "@/types/product.types";
import { removeAllCart } from "@/redux/features/checkout-flow/checkoutFlowSlice";

type CartDataProps = {
  productItem: Product;
  qty: number;
};
const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.checkoutFlow);
  return (
    <div className="flex flex-col py-[34px] px-[10px] gap-5 w-[309px] bg-white h-screen shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl">
          <strong>New</strong> Order
        </div>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => dispatch(removeAllCart())}
        >
          <Image src={TrashIcon} alt="Delete Icon" />
        </Button>
      </div>
      <ScrollArea className="h-[90vh]">
        {cart.map((item: CartDataProps) => {
          return (
            <CartItem
              key={item.productItem.id}
              id={item.productItem.id}
              image_url={item.productItem.image}
              name={item.productItem.product_name}
              price={item.productItem.price}
              qty={item.qty}
            />
          );
        })}
      </ScrollArea>
      <Button className="bg-hijaugelap" asChild>
        <Link
          href="/neworder/checkout"
          className="flex justify-between pl-5 pr-[10px] py-3 text-base"
        >
          <div className="font-bold">Rp.200.000.000</div>
          <div className="flex gap-[5px] justify-between items-center">
            <span className="font-normal">Pay</span>
            <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default Cart;
