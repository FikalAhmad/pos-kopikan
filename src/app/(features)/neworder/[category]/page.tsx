import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ListProduct from "./components/ListProduct";
import Cart from "./components/Cart";

const CategoryOrder = () => {
  return (
    <div className="w-full flex gap-6 flex-col lg:flex-row">
      <div className="w-[525px] flex flex-col gap-[30px]">
        <div className="relative">
          <Input className="mt-7 bg-white" placeholder="        Search" />
          <Search className="absolute left-3 top-12 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <ListProduct />
        {/*  nanti di ListProduct ada param data untuk menerima data yang udah difilter berdasarkan param.category disini */}
      </div>
      <Cart />
    </div>
  );
};

export default CategoryOrder;
