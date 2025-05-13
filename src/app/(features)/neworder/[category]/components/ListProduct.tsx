import { Product } from "@/types/product.types";
import ProductCard from "./ProductCard";
import { useAppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/features/checkout-flow/checkoutFlowSlice";

interface ProductListProps {
  data: Product[];
}
const ListProduct = ({ data }: ProductListProps) => {
  const dispatch = useAppDispatch();

  const handleAddCart = (item: Product) => {
    dispatch(addToCart({ productItem: item, qty: 1 }));
  };

  return (
    <div className="grid grid-cols-3 auto-cols-auto justify-between gap-5">
      {data.map((item: Product) => {
        return (
          <div
            key={item.id}
            onClick={() => handleAddCart(item)}
            className="hover: cursor-pointer"
          >
            <ProductCard
              image_url={item.image}
              price={item.price}
              name={item.product_name}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListProduct;
