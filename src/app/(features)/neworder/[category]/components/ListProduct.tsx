import ProductCard from "./ProductCard";
import AlmondChoco from "@/public/assets/product-images/AlmondChoco.png";

const ListProduct = () => {
  return (
    <div className="grid grid-cols-3 auto-cols-auto justify-between gap-5">
      <ProductCard
        image_url={AlmondChoco}
        price={10000}
        name="Butterscotch Sea Salt Latte"
      />
      <ProductCard
        image_url={AlmondChoco}
        price={10000}
        name="Butterscotch Sea Salt Latte"
      />
      <ProductCard
        image_url={AlmondChoco}
        price={10000}
        name="Butterscotch Sea Salt Latte"
      />
      <ProductCard
        image_url={AlmondChoco}
        price={10000}
        name="Butterscotch Sea Salt Latte"
      />
    </div>
  );
};

export default ListProduct;
