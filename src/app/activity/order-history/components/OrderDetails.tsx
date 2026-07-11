import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import formatPrice from "@/lib/rupiah";
import {
  User,
  Printer,
  Receipt,
  Clock,
  Coffee,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  notes?: string;
}

interface OrderDetailsProps {
  orderId?: string;
  dateTime?: string;
  customerName?: string;
  orderStatus?: string;
  totalPayment?: number;
  paymentStatus?: string;
  paymentMethod?: string;
  items?: OrderItem[];
}

const OrderDetails = ({
  orderId = "001",
  dateTime = "04/02/2001 - 02:00 PM",
  customerName = "Fikal",
  orderStatus = "Done",
  totalPayment = 31000,
  paymentStatus = "Paid",
  paymentMethod = "QRIS",
  items = [
    {
      name: "Es Kopi Susu Kopikan",
      qty: 1,
      price: 18000,
      notes: "Less Sugar, Normal Ice",
    },
    { name: "Croissant Keju", qty: 1, price: 13000 },
  ],
}: OrderDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-hijaugelap hover:text-green-700 font-semibold p-0 h-auto"
        >
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-0 overflow-hidden max-w-[420px] rounded-3xl border-none shadow-2xl">
        <div className="bg-hijaugelap text-white p-6 relative">
          <DialogHeader className="text-left">
            <div className="flex justify-between items-start mt-2">
              <DialogTitle className="text-2xl font-bold mt-2 text-white">
                Order #{orderId}
              </DialogTitle>
              <div className="flex flex-col items-end gap-1.5">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm border ${
                    orderStatus.toLowerCase() === "done"
                      ? "bg-green-500/20 text-green-200 border-green-500/30"
                      : "bg-amber-500/20 text-amber-200 border-amber-500/30"
                  }`}
                >
                  {orderStatus}
                </span>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <User size={14} className="text-hijaugelap" />
              <div>
                <p className="text-[10px] text-gray-400 font-medium uppercase">
                  Customer
                </p>
                <p className="font-semibold text-gray-800">{customerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={14} className="text-hijaugelap" />
              <div>
                <p className="text-[10px] text-gray-400 font-medium uppercase">
                  Time
                </p>
                <p className="font-semibold text-gray-800">{dateTime}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
              <Coffee size={16} className="text-hijaugelap" />
              <h3 className="font-semibold text-sm text-gray-800">
                Order Items
              </h3>
            </div>
            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-gray-800">
                      {item.name}{" "}
                      <span className="text-gray-400 font-normal ml-1">
                        x{item.qty}
                      </span>
                    </p>
                    {item.notes && (
                      <p className="text-[10px] text-amber-600 italic">
                        Note: {item.notes}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold text-gray-700">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 flex items-center gap-1.5">
                <CreditCard size={14} className="text-gray-400" />
                Payment Method
              </span>
              <span className="font-semibold text-gray-700">
                {paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-gray-400" />
                Payment Status
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  paymentStatus.toLowerCase() === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {paymentStatus}
              </span>
            </div>
          </div>

          <div className="bg-hijaugelap/5 p-4 rounded-2xl border border-hijaugelap/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Receipt size={18} className="text-hijaugelap" />
              <span className="font-bold text-sm text-gray-800">
                Total Paid
              </span>
            </div>
            <span className="text-lg font-bold text-hijaugelap">
              {formatPrice(totalPayment)}
            </span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
          <Button className="w-full bg-hijaugelap hover:bg-green-800 text-white rounded-xl py-5 flex items-center justify-center gap-2 text-xs font-semibold shadow-sm transition-all border-none">
            <Printer size={14} />
            Print Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
