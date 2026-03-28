"use client";
import { Button } from "@/components/ui/button";
import { addItemIcon, removeItemIcon, removeIcon } from "@/lib/icons";
import formatPrice from "@/lib/rupiah";
import {
  decreaseQty,
  increaseQty,
  removeToCart,
} from "@/redux/features/carts/cartSlice";
import { useAppDispatch } from "@/redux/store";
import { ProductItemCartProps } from "@/types/product.types";
import Image from "next/image";

const CartItem = ({
  data,
  qty,
}: {
  data: ProductItemCartProps;
  qty: number;
}) => {
  const dispatch = useAppDispatch();
  const updateCart = (type: string, productItem: ProductItemCartProps) => {
    if (type === "INCREASE_QTY") {
      dispatch(increaseQty(productItem));
    }
    if (type === "DECREASE_QTY") {
      dispatch(decreaseQty(productItem));
    }
    if (type === "REMOVE_ITEM") {
      dispatch(removeToCart(productItem));
    }
  };
  return (
    <div className="max-w-[397px] h-full flex">
      <div>
        <Image
          src={data.image}
          width={72}
          height={72}
          alt={data.product_name}
        />
      </div>
      <div className="h-[130px] max-h-[130px] flex text-sm px-[10px] gap-[10px] w-full">
        <div className="flex flex-col justify-between w-full max-w-[305px]">
          <div>{data.product_name}</div>
          <div className="flex flex-col text-xs font-light">
            {data.options.slice(0, 3).map((opt) => {
              return (
                <div key={opt.id}>
                  {opt.name} : {opt.values.label}
                </div>
              );
            })}
            {data.options.length > 3 ? (
              <div>+{data.options.length - 2}</div>
            ) : null}
          </div>
          <div className="flex gap-[30px] items-center">
            <Button
              className="w-[30px] h-[30px] bg-hijaugelap rounded-full"
              size={"icon"}
              onClick={() => updateCart("DECREASE_QTY", data)}
            >
              <Image src={removeItemIcon} width={20} alt="Remove Icon" />
            </Button>
            <span>{qty}</span>
            <Button
              className="w-[30px] h-[30px] bg-hijaugelap rounded-full"
              size={"icon"}
              onClick={() => updateCart("INCREASE_QTY", data)}
            >
              <Image src={addItemIcon} width={20} alt="Add Icon" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div>{formatPrice(data.price)}</div>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => updateCart("REMOVE_ITEM", data)}
          >
            <Image src={removeIcon} width={15} alt="Remove Product Icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
