"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ListProduct from "./components/ListProduct";
import Cart from "./components/Cart";
import { useProducts } from "@/redux/features/products/productAPI";

const CategoryOrder = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  const { products } = useProducts();

  const filtered = products.filter(
    (item) => item.category.toLowerCase() === category
  );
  return (
    <div className="w-full flex gap-6 flex-col lg:flex-row">
      <div className="w-[525px] flex flex-col gap-[30px]">
        <div className="relative">
          <Input className="mt-7 bg-white" placeholder="        Search" />
          <Search className="absolute left-3 top-12 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <ListProduct data={filtered} />
      </div>
      <Cart />
    </div>
  );
};

export default CategoryOrder;
