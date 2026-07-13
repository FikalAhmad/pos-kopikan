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
import { SearchIcon } from "lucide-react";
import Image from "next/image";

const FavoriteProduct = () => {
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
            <TableRow>
              <TableCell>
                <Image
                  src="https://kopikan.vercel.app/product-images/Matcha.png"
                  alt="Matcha"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>Matcha Latte</TableCell>
              <TableCell>183 Items</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="https://kopikan.vercel.app/product-images/Matcha.png"
                  alt="Matcha"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>Matcha Latte</TableCell>
              <TableCell>183 Items</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="https://kopikan.vercel.app/product-images/Matcha.png"
                  alt="Matcha"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>Matcha Latte</TableCell>
              <TableCell>183 Items</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="https://kopikan.vercel.app/product-images/Matcha.png"
                  alt="Matcha"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>Matcha Latte</TableCell>
              <TableCell>183 Items</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="https://kopikan.vercel.app/product-images/Matcha.png"
                  alt="Matcha"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>Matcha Latte</TableCell>
              <TableCell>183 Items</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="https://kopikan.vercel.app/product-images/Matcha.png"
                  alt="Matcha"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>Matcha Latte</TableCell>
              <TableCell>183 Items</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="https://kopikan.vercel.app/product-images/Matcha.png"
                  alt="Matcha"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>Matcha Latte</TableCell>
              <TableCell>183 Items</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default FavoriteProduct;
