import formatPrice from "@/lib/rupiah";
import Image, { StaticImageData } from "next/image";

type ProductCardType = {
  image_url: string | StaticImageData;
  price: number;
  name: string;
};
const ProductCard = ({ image_url, price, name }: ProductCardType) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-3xl hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100/50">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-4 relative">
        <Image
          src={image_url}
          width={140}
          height={105}
          alt={name}
          priority
          className="object-contain group-hover:scale-105 transition-transform duration-300 max-h-full"
        />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <div className="font-semibold text-gray-800 text-sm md:text-base line-clamp-1 group-hover:text-hijaugelap transition-colors">
          {name}
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="font-bold text-gray-900 text-sm md:text-base">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
