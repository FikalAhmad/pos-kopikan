import formatPrice from "@/lib/rupiah";
import Image, { StaticImageData } from "next/image";

type ProductCardType = {
  image_url: string | StaticImageData;
  price: number;
  name: string;
};
const ProductCard = ({ image_url, price, name }: ProductCardType) => {
  return (
    <div className="h-[250px] flex flex-col items-center gap-[10px] px-[10px] py-5 bg-white hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-square overflow-hidden bg-muted">
        <Image
          src={image_url}
          width={122}
          height={122}
          alt={name}
          priority
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="h-[58px] flex flex-col items-center gap-[10px]">
        <div>{formatPrice(price)}</div>
        <div className="font-bold text-center">{name}</div>
      </div>
    </div>
  );
};

export default ProductCard;
