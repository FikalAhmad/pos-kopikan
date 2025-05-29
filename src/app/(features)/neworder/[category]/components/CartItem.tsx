"use client";
import { Button } from "@/components/ui/button";
import { addItemIcon, removeItemIcon, removeIcon } from "@/lib/icons";
import {
  decreaseQty,
  increaseQty,
  removeToCart,
} from "@/redux/features/carts/cartSlice";
import { useAppDispatch } from "@/redux/store";
import Image, { StaticImageData } from "next/image";

type CartDetailProps = {
  id: string;
  image_url: string | StaticImageData;
  price: number;
  name: string;
  qty: number;
};
const CartItem = ({ id, image_url, price, name, qty }: CartDetailProps) => {
  const dispatch = useAppDispatch();
  const updateCart = (type: string, productId: string) => {
    if (type === "INCREASE_QTY") {
      dispatch(increaseQty({ id: productId }));
    }
    if (type === "DECREASE_QTY") {
      dispatch(decreaseQty({ id: productId }));
    }
    if (type === "REMOVE_ITEM") {
      dispatch(removeToCart({ id: productId }));
    }
  };
  return (
    <div className="max-w-[397px] h-full flex">
      <div>
        <Image
          src={image_url}
          width={72}
          height={72}
          alt={"Butterscotch Sea Salt Latte"}
        />
      </div>
      <div className="h-[130px] max-h-[130px] flex text-sm py-5 px-[10px] gap-[10px] w-full">
        <div className="flex flex-col justify-between w-full max-w-[305px]">
          <div>{name}</div>
          <div className="flex gap-[30px] items-center">
            <Button
              className="w-[30px] h-[30px] bg-hijaugelap rounded-full"
              size={"icon"}
              onClick={() => updateCart("DECREASE_QTY", id)}
            >
              <Image src={removeItemIcon} width={20} alt="Remove Icon" />
            </Button>
            <span>{qty}</span>
            <Button
              className="w-[30px] h-[30px] bg-hijaugelap rounded-full"
              size={"icon"}
              onClick={() => updateCart("INCREASE_QTY", id)}
            >
              <Image src={addItemIcon} width={20} alt="Add Icon" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div>{price}</div>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => updateCart("REMOVE_ITEM", id)}
          >
            <Image src={removeIcon} width={15} alt="Remove Product Icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
