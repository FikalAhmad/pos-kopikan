import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateOrderStatusMutation } from "@/redux/features/api/ordersApi";
import { TrackOrderResponse } from "@/types/order.type";
import { toast } from "sonner";
import { formatDate } from "date-fns";

type TrackOrderCardProps = {
  order: TrackOrderResponse;
};

const STATUS_OPTIONS = ["PAID", "PREPARING", "READY", "COMPLETED"];

const TrackOrderCard = ({ order }: TrackOrderCardProps) => {
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateOrderStatus({ id: order.id, status: newStatus }).unwrap();
      toast.success(`Status order berhasil diubah ke ${newStatus}`);
    } catch {
      toast.error("Gagal mengubah status order");
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-2 w-44 h-44">
      <div className="flex flex-col justify-between items-start gap-2">
        <div className="flex gap-2">
          <div className="text-lg truncate w-24">{order.customer_name}</div>
          <Select
            value={order.status}
            onValueChange={handleStatusChange}
            disabled={isLoading}
          >
            <SelectTrigger className="h-6 w-auto gap-1 text-[10px] font-semibold px-2 py-0 bg-hijaugelap/20 border-none rounded-full text-hijaugelap focus:ring-0 focus:ring-offset-0 shadow-none">
              <SelectValue placeholder={order.status} />
            </SelectTrigger>
            <SelectContent className="min-w-[100px]">
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status} className="text-xs">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-500">
            {order.table?.table_number ? `${order.table.table_number} - ` : ""}{order.order_type}
          </div>
          <div className="text-xs text-gray-500">
            {order.createdAt
              ? formatDate(new Date(order.createdAt), "hh:mm a")
              : "-"}
          </div>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-2">
        {order.order_details.slice(0, 1).map((item) => {
          return (
            <div key={item.id} className="text-xs text-gray-500">
              {item.qty}x {item.product.product_name}
            </div>
          );
        })}
        {order.order_details.length > 1 && (
          <div className="text-xs font-medium text-gray-400">
            +{order.order_details.length - 1} more
          </div>
        )}
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between">
        <div className="text-xs">Total Order</div>
        <div className="text-xs">{order.order_details.length} Items</div>
      </div>
    </div>
  );
};

export default TrackOrderCard;
