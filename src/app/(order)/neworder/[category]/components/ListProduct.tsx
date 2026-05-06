"use client";

import ProductCard from "./ProductCard";
import { useAppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/features/carts/cartSlice";
import { ProductItemCartProps, ProductWithOption } from "@/types/product.types";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { addItemIcon, removeItemIcon } from "@/lib/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import formatPrice from "@/lib/rupiah";
import { Separator } from "@/components/ui/separator";

interface ProductListProps {
  data: ProductWithOption[];
}
const ListProduct = ({ data }: ProductListProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithOption | null>(null);
  const [qtyDisplay, setQtyDisplay] = useState(1);
  const [optionProduct, setOptionProduct] = useState<
    {
      id: string;
      name: string;
      values: { id: string; label: string; extra_price: number };
    }[]
  >([]);

  const totalExtraPrice = optionProduct.reduce((acc, curr) => {
    return acc + curr.values.extra_price;
  }, 0);

  const handleSelectedProduct = (product: ProductWithOption) => {
    const standarization = ["Size", "Ice Level", "Sweet Level"];

    const sortedOptions = [...product.options].sort((a, b) => {
      return standarization.indexOf(a.name) - standarization.indexOf(b.name);
    });

    const standardizedProduct = {
      ...product,
      options: sortedOptions,
    };

    setSelectedProduct(standardizedProduct);

    if (sortedOptions) {
      const initialOptions = sortedOptions.map((option) => {
        const firstValue = option.values[0];
        return {
          id: option.id,
          name: option.name,
          values: {
            id: firstValue.id,
            label: firstValue.label,
            extra_price: firstValue.extra_price,
          },
        };
      });
      setOptionProduct(initialOptions);
    }

    setOpen(true);
  };

  const handleAddCart = (product: ProductItemCartProps) => {
    dispatch(addToCart({ productItem: product, qty: qtyDisplay }));
    setQtyDisplay(1);
    setOpen(false);
    setOptionProduct([]);
  };

  const handleChooseOption = (
    optionName: { id: string; name: string },
    optionValue: { id: string; label: string; extra_price: number },
  ) => {
    setOptionProduct((prev) => {
      const exists = prev.some((opt) => opt.id === optionName.id);

      if (exists) {
        return prev?.map((opt) =>
          opt.id === optionName.id ? { ...opt, values: optionValue } : opt,
        );
      } else {
        return [
          ...prev,
          { id: optionName.id, name: optionName.name, values: optionValue },
        ];
      }
    });
  };

  return (
    <>
      <ScrollArea className="h-[calc(100vh-140px)] w-full pr-4">
        <div className="grid grid-cols-3 gap-5 pb-10">
          {data?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectedProduct(item)}
              className="hover:cursor-pointer"
            >
              <ProductCard
                image_url={item.image}
                price={item.price}
                name={item.product_name}
              />
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white max-w-md sm:max-w-lg w-full">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="flex gap-3">
                  <Image
                    width={65}
                    height={65}
                    src={selectedProduct.image}
                    alt={selectedProduct.product_name}
                    className="object-cover rounded"
                  />
                  <div className="flex flex-col gap-2">
                    <DialogTitle className="font-bold">
                      {selectedProduct.product_name}
                    </DialogTitle>
                    <DialogDescription className="font-medium">
                      {selectedProduct.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between ">
                  <div className="font-semibold text-lg">Qty</div>
                  <div className="flex gap-7 items-center">
                    <Button
                      className="w-[30px] h-[30px] bg-hijaugelap rounded-full"
                      size={"icon"}
                      disabled={qtyDisplay <= 1}
                      onClick={() => {
                        setQtyDisplay(qtyDisplay - 1);
                      }}
                    >
                      <Image
                        src={removeItemIcon}
                        width={20}
                        alt="Remove Icon"
                        unoptimized
                      />
                    </Button>
                    <span className="font-medium text-lg">{qtyDisplay}</span>
                    <Button
                      className="w-[30px] h-[30px] bg-hijaugelap rounded-full"
                      size={"icon"}
                      onClick={() => {
                        setQtyDisplay(qtyDisplay + 1);
                      }}
                    >
                      <Image
                        src={addItemIcon}
                        width={20}
                        alt="Add Icon"
                        unoptimized
                      />
                    </Button>
                  </div>
                </div>
                <Separator className="my-2" />
                {selectedProduct.options.length > 0
                  ? selectedProduct.options.map((option) => {
                      return (
                        <div className="flex flex-col gap-1" key={option.id}>
                          <div className="font-bold text-lg">{option.name}</div>
                          <div className="">
                            <Tabs
                              value={
                                optionProduct.find(
                                  (opt) => opt.id === option.id,
                                )?.values.id || option.values[0]?.id
                              }
                              onValueChange={(val) => {
                                const chosen = option.values.find(
                                  (v) => v.id == val,
                                );
                                if (chosen) {
                                  handleChooseOption(
                                    { id: option.id, name: option.name },
                                    {
                                      id: chosen.id,
                                      label: chosen.label,
                                      extra_price: chosen.extra_price,
                                    },
                                  );
                                }
                              }}
                            >
                              <TabsList className="grid grid-cols-2 gap-2 w-full h-max bg-white">
                                {option.values?.map((value) => {
                                  return (
                                    <TabsTrigger
                                      className="flex items-center justify-center px-3 py-2 text-sm flex-1 rounded-md data-[state=active]:border-hijaugelap data-[state=active]:text-hijaugelap data-[state=active]:bg-green-500/20 "
                                      value={value.id}
                                      key={value.id}
                                      asChild
                                    >
                                      <Button
                                        variant="outline"
                                        className="font-medium"
                                      >
                                        <div>{value.label}</div>
                                        <div>
                                          + {formatPrice(value.extra_price)}
                                        </div>
                                      </Button>
                                    </TabsTrigger>
                                  );
                                })}
                              </TabsList>
                            </Tabs>
                          </div>
                        </div>
                      );
                    })
                  : null}

                <div className="flex flex-col gap-3 mt-5">
                  <div className="flex justify-between px-10 text-lg font-bold">
                    <div>Total</div>
                    <div>
                      {formatPrice(
                        qtyDisplay * (selectedProduct.price + totalExtraPrice),
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between gap-5 mt-5">
                    <DialogClose className="w-full" asChild>
                      <Button className="w-full" variant={"secondary"}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      className="w-full bg-hijaugelap"
                      onClick={() =>
                        handleAddCart({
                          id: selectedProduct.id,
                          product_name: selectedProduct.product_name,
                          image: selectedProduct.image,
                          description: selectedProduct.description,
                          category: selectedProduct.category,
                          price: selectedProduct.price,
                          options: optionProduct,
                        })
                      }
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListProduct;
