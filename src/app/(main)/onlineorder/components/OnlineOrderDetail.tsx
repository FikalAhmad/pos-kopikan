import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { axiosJWT } from "@/lib/axios";
import { ArrowRight } from "@/lib/icons";
import { OrderDataResponse, OrderDetailResponse } from "@/types/order.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

type CheckedItemsProps = {
  [key: string]: boolean;
};

const OnlineOrderDetail = ({ data }: { data: OrderDataResponse }) => {
  const [checkedItems, setCheckedItems] = useState<CheckedItemsProps>({});
  const queryClient = useQueryClient();

  const handleChange = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allChecked =
    data.order_details.length > 0 &&
    data.order_details.every((item: { id: string }) => checkedItems[item.id]);

  const allCompleted = useMutation({
    mutationFn: (id: string) => {
      return axiosJWT.patch(`/api/orders/${id}`, {
        status: "COMPLETED",
      });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["onlineorders"] });
    },
  });

  return (
    <div className="flex flex-col py-9 px-[10px] gap-5 w-full bg-white h-screen">
      <div className="flex flex-col gap-5 justify-between">
        <div className="text-xl truncate">
          <strong>Order</strong>
          <span>#{data.id}</span>
        </div>
        <div className="flex items-center text-xs gap-5">
          <div>Order Status:</div>
          <div className="text-white bg-hijaugelap p-1 rounded-sm">
            {data.status}
          </div>
        </div>
        <div className="flex justify-between font-bold min-h-10 shadow-sm">
          <div>Item</div>
          <div>Qty</div>
        </div>
      </div>
      <ScrollArea className="h-[90vh]">
        <div className="flex flex-col gap-[10px]">
          {data?.order_details.map((item: OrderDetailResponse) => {
            return (
              <div className="flex justify-between" key={item.id}>
                <div className="flex justify-between w-full text-sm font-medium min-h-10 shadow-sm">
                  <div>{item.product.product_name}</div>
                  <div>{item.qty}</div>
                </div>
                {data.status === "PENDING" && (
                  <div>
                    <Checkbox onCheckedChange={() => handleChange(item.id)} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      {data.status === "PENDING" && (
        <Button
          className={`flex justify-between ${
            allChecked ? "bg-hijaugelap" : "bg-gray-200 text-gray-400"
          }`}
          disabled={!allChecked}
          onClick={() => allCompleted.mutate(data.id)}
        >
          <div className="font-bold">Complete</div>

          <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
        </Button>
      )}
    </div>
  );
};

export default OnlineOrderDetail;
