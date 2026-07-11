"use client";
import { Input } from "@/components/ui/input";
import {
  Search,
  Coffee,
  Sparkles,
  CupSoda,
  Utensils,
  ChefHat,
} from "lucide-react";
import ListProduct from "./components/ListProduct";
import Cart from "./components/Cart";
import { useProducts } from "@/hooks/api/useProducts";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductWithOption } from "@/types/product.types";
import Topbar from "@/app/(order)/neworder/components/Topbar";
import NavProduct from "./components/NavProduct";
import { ScrollArea } from "@/components/ui/scroll-area";
import BottomBar from "@/components/BottomBar";

const CategoryOrder = () => {
  const [category, setCategory] = useState("all");
  const { products } = useProducts();
  const [searchProduct, setSearchProduct] = useState("");

  const debouncedSearchTerm = useDebounce(searchProduct.toLowerCase(), 300);

  const dynamicCategories = Array.from(
    new Set(products?.map((item) => item.category) || []),
  );

  const categoryItems = [
    {
      categoryName: "all",
      label: "All Menu",
      icon: ChefHat,
      count: products?.length || 0,
    },
    ...dynamicCategories.map((cat) => {
      let icon = Coffee;
      const lower = cat.toLowerCase();
      if (lower.includes("signature")) icon = Sparkles;
      else if (
        lower.includes("noncoffee") ||
        lower.includes("drink") ||
        lower.includes("tea")
      )
        icon = CupSoda;
      else if (lower.includes("coffee")) icon = Coffee;
      else icon = Utensils;

      return {
        categoryName: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        icon: icon,
        count: products?.filter((p) => p.category === cat).length || 0,
      };
    }),
  ];

  const filtered =
    products?.filter((item: ProductWithOption) => {
      const matchesSearch = debouncedSearchTerm
        ? item.product_name.toLowerCase().includes(debouncedSearchTerm)
        : true;

      const matchesCategory =
        category.toLowerCase() === "all" || category.toLowerCase() === "allmenu"
          ? true
          : item.category.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    }) || [];

  return (
    <div className="w-full flex gap-4 flex-col lg:flex-row h-screen overflow-hidden">
      <div className="flex-1 flex flex-col gap-4 py-2 h-full overflow-hidden relative">
        <Topbar />
        <div className="flex gap-4 overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-200">
          {categoryItems.map((cat) => (
            <NavProduct
              key={cat.categoryName}
              categoryName={cat.categoryName}
              label={cat.label}
              isActive={
                category.toLowerCase() === cat.categoryName.toLowerCase() ||
                (cat.categoryName === "all" &&
                  category.toLowerCase() === "allmenu")
              }
              itemCount={cat.count}
              icon={cat.icon}
              setCategory={setCategory}
            />
          ))}
        </div>

        <ScrollArea className="flex-1 min-h-0 w-full">
          <div className="relative my-4 pr-2">
            <Input
              className="bg-white pr-12 pl-6 py-6 rounded-full border-none shadow-sm text-gray-700 placeholder:text-gray-400"
              placeholder="Search Product ..."
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-50 hover:bg-gray-100 px-2 rounded-full cursor-pointer transition-colors">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="pr-2">
            <ListProduct data={filtered} />
          </div>
        </ScrollArea>
        <BottomBar />
      </div>
      <Cart />
    </div>
  );
};

export default CategoryOrder;
