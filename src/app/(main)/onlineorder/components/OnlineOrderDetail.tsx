import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { axiosJWT } from "@/lib/axios";
import { ArrowRight } from "@/lib/icons";
import { OrderDataResponse, OrderDetailResponse } from "@/types/order.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Clock, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type CheckedItemsProps = {
  [key: string]: boolean;
};

const OnlineOrderDetail = ({ data }: { data: OrderDataResponse }) => {
  const [checkedItems, setCheckedItems] = useState<CheckedItemsProps>({});
  const queryClient = useQueryClient();

  // Reset checkedItems saat detail order berganti ke pesanan lain
  useEffect(() => {
    setCheckedItems({});
  }, [data.id]);

  const handleChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const allChecked =
    data.order_details.length > 0 &&
    data.order_details.every(
      (item: OrderDetailResponse) => checkedItems[item.id],
    );

  const allCompleted = useMutation({
    mutationFn: (id: string) => {
      return axiosJWT.patch(`/api/orders/${id}`, {
        status: "COMPLETED",
      });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["onlineorders"] });
      toast.success(`Order #${data.id} berhasil diselesaikan!`);
    },
    onError: (error) => {
      toast.error(
        `Gagal menyelesaikan order: ${error.message || "Terjadi kesalahan"}`,
      );
    },
  });

  return (
    <div className="flex flex-col w-full bg-white h-screen justify-between py-6 px-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 pb-4 border-b border-gray-100">
        <div className="text-xl font-bold text-gray-900">
          Order <span className="font-mono text-hijaugelap">#{data.id}</span>
        </div>

        <div className="flex items-center text-xs gap-3">
          <span className="text-gray-500 font-medium">Status Pesanan:</span>
          <div
            className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 font-semibold text-[11px] ${
              data.status === "PENDING"
                ? "bg-amber-50 text-amber-600 border border-amber-200"
                : "bg-emerald-50 text-emerald-600 border border-emerald-200"
            }`}
          >
            {data.status === "PENDING" ? (
              <Clock className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5" />
            )}
            {data.status}
          </div>
        </div>

        <div className="flex justify-between font-extrabold text-xs text-gray-400 mt-2">
          <span>ITEM</span>
          <span>QTY</span>
        </div>
      </div>

      {/* Content Section (Scrollable) */}
      <ScrollArea className="flex-1 my-4 pr-2">
        <div className="flex flex-col gap-2">
          {data?.order_details.map((item: OrderDetailResponse) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() =>
                  data.status === "PENDING" && handleChange(item.id, !isChecked)
                }
                className={`flex justify-between items-center py-3 px-4 border rounded-xl transition-all duration-200 ${
                  data.status === "PENDING"
                    ? isChecked
                      ? "bg-emerald-50/40 border-emerald-100 text-gray-900"
                      : "bg-white border-gray-100 hover:bg-slate-50/50 text-gray-700 cursor-pointer"
                    : "bg-white border-gray-50 text-gray-500"
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {item.product.product_name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-900">
                    x{item.qty}
                  </span>
                  {data.status === "PENDING" && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleChange(item.id, !!checked)
                        }
                        className="data-[state=checked]:bg-hijaugelap data-[state=checked]:border-hijaugelap"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer / Action Button */}
      {data.status === "PENDING" && (
        <Button
          className={`w-full py-6 flex justify-between items-center rounded-xl transition-all duration-200 active:scale-[0.98] ${
            allChecked && !allCompleted.isPending
              ? "bg-hijaugelap hover:bg-hijaugelap/90 text-white shadow-lg shadow-hijaugelap/20"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!allChecked || allCompleted.isPending}
          onClick={() => allCompleted.mutate(data.id)}
        >
          {allCompleted.isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-bold">Menyelesaikan...</span>
            </div>
          ) : (
            <>
              <span className="font-bold">Selesaikan Pesanan</span>
              <Image
                src={ArrowRight}
                alt="Arrow Right Icon"
                width={20}
                className="brightness-0 invert"
                unoptimized
              />
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default OnlineOrderDetail;
