"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  FileSpreadsheet,
  Package,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  image: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const mockInventory: InventoryItem[] = [
  {
    id: "P001",
    name: "Matcha Latte",
    category: "Non Coffee",
    stock: 45,
    minStock: 10,
    price: 31000,
    image: "https://kopikan.vercel.app/product-images/Matcha.png",
    status: "In Stock",
  },
  {
    id: "P002",
    name: "Espresso",
    category: "Coffee",
    stock: 120,
    minStock: 20,
    price: 20000,
    image: "https://kopikan.vercel.app/product-images/Matcha.png", // reusing image for layout fallback
    status: "In Stock",
  },
  {
    id: "P003",
    name: "Chocolate Croissant",
    category: "Bakery",
    stock: 8,
    minStock: 10,
    price: 25000,
    image: "https://kopikan.vercel.app/product-images/Matcha.png",
    status: "Low Stock",
  },
  {
    id: "P004",
    name: "Caramel Macchiato",
    category: "Coffee",
    stock: 35,
    minStock: 10,
    price: 35000,
    image: "https://kopikan.vercel.app/product-images/Matcha.png",
    status: "In Stock",
  },
  {
    id: "P005",
    name: "Red Velvet Latte",
    category: "Non Coffee",
    stock: 0,
    minStock: 10,
    price: 31000,
    image: "https://kopikan.vercel.app/product-images/Matcha.png",
    status: "Out of Stock",
  },
  {
    id: "P006",
    name: "Ice Cappuccino",
    category: "Coffee",
    stock: 60,
    minStock: 15,
    price: 30000,
    image: "https://kopikan.vercel.app/product-images/Matcha.png",
    status: "In Stock",
  },
  {
    id: "P007",
    name: "Earl Grey Tea",
    category: "Non Coffee",
    stock: 4,
    minStock: 8,
    price: 22000,
    image: "https://kopikan.vercel.app/product-images/Matcha.png",
    status: "Low Stock",
  },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = mockInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Coffee", "Non Coffee", "Bakery"];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-medium rounded-full px-3 py-1">
            In Stock
          </Badge>
        );
      case "Low Stock":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-medium rounded-full px-3 py-1">
            Low Stock
          </Badge>
        );
      case "Out of Stock":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-medium rounded-full px-3 py-1">
            Out of Stock
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full p-1">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-hijaugelap/10 rounded-full text-hijaugelap">
            <Package size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Total Products
            </div>
            <div className="text-2xl font-bold text-gray-800">248</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-full text-amber-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Low Stock Items
            </div>
            <div className="text-2xl font-bold text-gray-800">12</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-full text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Out of Stock
            </div>
            <div className="text-2xl font-bold text-gray-800">3</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Healthy Stock Rate
            </div>
            <div className="text-2xl font-bold text-gray-800">93.9%</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4 flex-1 min-h-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search inventory..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 rounded-full text-xs"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={`h-9 px-4 rounded-full text-xs font-medium ${
                    selectedCategory === category
                      ? "bg-hijaugelap text-white hover:bg-hijaugelap/90"
                      : "text-gray-600 border-gray-200"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full md:w-auto justify-end">
            <Button
              variant="outline"
              className="h-9 rounded-full text-xs border-gray-200 flex items-center gap-1.5 text-gray-700"
            >
              <FileSpreadsheet size={14} />
              Export CSV
            </Button>
            <Button className="h-9 rounded-full text-xs bg-hijaugelap text-white hover:bg-hijaugelap/90 flex items-center gap-1.5">
              <Plus size={14} />
              Add Product
            </Button>
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 min-h-0 relative">
          <ScrollArea className="h-[calc(100vh-360px)]">
            <Table className="text-left">
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Product Details
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Category
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Stock Level
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Unit Price
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-gray-400 font-medium">
                            SKU: {item.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-600">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex flex-col gap-1 w-24">
                        <div className="flex justify-between font-medium text-xs">
                          <span>{item.stock}</span>
                          <span className="text-gray-400">
                            Min: {item.minStock}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.status === "In Stock"
                                ? "bg-green-500"
                                : item.status === "Low Stock"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(100, (item.stock / (item.minStock * 2)) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-800 text-sm">
                      {formatPrice(item.price)}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs font-semibold rounded-full border-gray-200 text-gray-700"
                        >
                          Restock
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs font-semibold rounded-full text-hijaugelap hover:bg-hijaugelap/10"
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
