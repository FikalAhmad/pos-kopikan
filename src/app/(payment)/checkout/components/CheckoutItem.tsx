import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="w-full h-full flex gap-2">
      <CardContent className="flex gap-2 p-2 w-full">
        <div className="relative">
          <Image
            src={data.image}
            width={180}
            height={180}
            alt={data.product_name}
            className="object-cover rounded-md"
          />
        </div>
        <div className="h-[130px] max-h-[130px] flex text-sm px-[10px] gap-[10px] w-full ">
          <div className="flex flex-col justify-between w-full">
            <div className="font-bold tracking-wider uppercase">
              {data.product_name}
            </div>
            {data.options.length > 0 && (
              <div className="flex flex-col gap-1 font-medium text-gray-400">
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
            )}
            <div className="flex gap-[30px] items-center justify-between">
              <span className="font-bold">{qty}x</span>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div className="font-medium">{formatPrice(data.price)}</div>
            <span className="font-black">{formatPrice(data.price * qty)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutItem;
