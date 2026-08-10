import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosJWT } from "@/lib/axios";
import formatPrice from "@/lib/rupiah";
import { TrackOrderResponse } from "@/types/order.type";
import { format } from "date-fns";
import { toast } from "sonner";

type QueueCardProps = {
  order: TrackOrderResponse;
};

const QueueCard = ({ order }: QueueCardProps) => {
  const handleTableStatus = async (id: string, data: boolean) => {
    try {
      await axiosJWT.patch(`/api/tables/${id}`, {
        is_active: data,
      });
    } catch {
      toast.error("Gagal mengupdate table");
    }
  };
  return (
    <div className="flex justify-between bg-white rounded-xl border w-full p-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col text-sm">
          <div className="font-semibold text-lg">{order.customer_name}</div>
          <div>
            Order Number:{" "}
            <span className="font-semibold">{order.order_number}</span>
          </div>
          <div>
            Table:{" "}
            <span className="font-semibold">{order.table?.table_number}</span>
          </div>
        </div>
        <div className="text-sm">
          {order.createdAt
            ? format(new Date(order.createdAt), "eee, d MMM yyyy - hh:mm a")
            : "-"}
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="font-semibold text-xl">{formatPrice(order.total)}</div>
        <Select
          value={String(order.table?.is_active ?? false)}
          onValueChange={(v) => {
            if (order.table_id) {
              handleTableStatus(order.table_id, v === "true");
            }
          }}
          disabled={!order.table_id}
        >
          <SelectTrigger className="h-6 w-auto gap-1 text-[10px] font-semibold px-2 py-0 bg-hijaugelap/20 border-none rounded-full text-hijaugelap focus:ring-0 focus:ring-offset-0 shadow-none">
            <SelectValue
              placeholder={order.table?.is_active ? "Active" : "Closed"}
            />
          </SelectTrigger>
          <SelectContent className="min-w-[100px]">
            <SelectItem value="true" className="text-xs">
              Active
            </SelectItem>
            <SelectItem value="false" className="text-xs">
              Closed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QueueCard;
