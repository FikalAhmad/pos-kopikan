import Image, { StaticImageData } from "next/image";

type CheckoutDetailProps = {
  image_url: string | StaticImageData;
  price: number;
  name: string;
  qty: number;
};
const CheckoutItem = ({ image_url, name, price, qty }: CheckoutDetailProps) => {
  return (
    <div className="w-full h-full flex">
      <div>
        <Image src={image_url} width={72} height={72} alt={name} />
      </div>
      <div className="h-[130px] max-h-[130px] flex text-sm py-5 px-[10px] gap-[10px] w-full">
        <div className="flex flex-col justify-between w-full">
          <div>{name}</div>
          <div className="flex gap-[30px] items-center justify-between">
            <span className="font-bold">{qty}x</span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div>{price}</div>
          <span className="font-bold">{price * qty}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
