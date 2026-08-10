import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { axiosJWT } from "@/lib/axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type QRWidgetProps = {
  order_id: string;
  qr_url: string;
  amount: number;
  onSuccess: () => void;
};

const QRWidget = ({ order_id, qr_url, amount, onSuccess }: QRWidgetProps) => {
  const [checking, setChecking] = useState(false);

  const handleCheckStatus = async () => {
    try {
      const res = await axiosJWT.get(`/api/payments/status/${order_id}`);
      const result = res.data;

      if (result.transaction_status === "settlement") {
        toast.success("Pembayaran Berhasil!");
        onSuccess();
      } else if (result.transaction_status === "pending") {
        toast.info("Pembayaran belum diterima, silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error checking status:", error);
      toast.error("Gagal memeriksa status pembayaran");
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <DialogHeader className="flex flex-col items-center">
        <DialogTitle>Kopikan Coffee</DialogTitle>
        <DialogDescription asChild>
          <div className="flex flex-col items-center text-xs text-gray-500">
            <span>Order ID: {order_id}</span>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col items-center gap-4 py-2">
        {qr_url && (
          <div className="border p-2 rounded-xl bg-white shadow-sm">
            <Image
              src={qr_url}
              width={240}
              height={240}
              alt="QRCODE-PAYMENT"
              priority
            />
          </div>
        )}
        <div className="text-center">
          <div className="text-xs text-gray-500">Total Pembayaran</div>
          <div className="font-bold text-lg text-hijaugelap">
            IDR {amount.toLocaleString("id-ID")}
          </div>
        </div>
        <Button
          onClick={() => handleCheckStatus}
          disabled={checking}
          className="w-full rounded-xl"
        >
          {checking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Status"
          )}
        </Button>
      </div>
    </>
  );
};

export default QRWidget;
