import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/api/useFetch";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

type FavouriteProductResponse = {
  image: string;
  product_name: string;
  qty: number;
};
const FavoriteProduct = ({ period }: { period: string }) => {
  const { data: favouriteProductData } = useFetch<FavouriteProductResponse[]>(
    ["dashboard-favouriteproduct", period ?? ""],
    `/api/dashboard/favourite-products?period=${period}`,
  );

  return (
    <div className="flex flex-col gap-2 bg-white rounded-lg px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-hijaugelap w-1.5 h-1.5 rounded-full" />
          <h1 className="font-semibold text-xl">Favorite Product</h1>
        </div>
        <Button
          size="icon"
          className="rounded-full bg-white text-hijaugelap border-black/10 hover:text-white"
        >
          <SearchIcon size={16} className="text-black/50" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-360px)] pr-2">
        <Table className="text-center relative">
          <TableHeader className="text-xs sticky top-0 bg-white z-10">
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">Img</div>
              </TableHead>
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">
                  Product Name
                </div>
              </TableHead>
              <TableHead className="text-center bg-transparent p-1">
                <div className="bg-gray-100 rounded-full py-2 px-3">
                  Total Orders
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favouriteProductData && favouriteProductData.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <div className="text-sm">
                    Belum ada product yang ditambahkan.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              favouriteProductData?.map(
                (product: FavouriteProductResponse, idx) => {
                  return (
                    <TableRow key={product.product_name + (idx + 1)}>
                      <TableCell>
                        <Image
                          src={product.image}
                          alt={product.product_name}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                      </TableCell>
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.qty} Items</TableCell>
                    </TableRow>
                  );
                },
              )
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default FavoriteProduct;
