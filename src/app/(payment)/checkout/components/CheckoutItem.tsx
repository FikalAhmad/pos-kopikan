import formatPrice from "@/lib/rupiah";
import { ProductItemCartProps } from "@/types/product.types";
import Image from "next/image";

const CheckoutItem = ({
  data,
  qty,
}: {
  data: ProductItemCartProps;
  qty: number;
}) => {
  return (
    <div className="w-full h-full flex gap-2">
      <div>
        <Image
          src={data.image}
          width={72}
          height={72}
          alt={data.product_name}
        />
      </div>
      <div className="h-[130px] max-h-[130px] flex text-sm px-[10px] gap-[10px] w-full">
        <div className="flex flex-col justify-between w-full">
          <div>{data.product_name}</div>
          <div className="flex flex-col text-xs font-light">
            {data.options.slice(0, 3)?.map((opt) => {
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
          <div className="flex gap-[30px] items-center justify-between">
            <span className="font-bold">{qty}x</span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div>{formatPrice(data.price)}</div>
          <span className="font-bold">{formatPrice(data.price * qty)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
