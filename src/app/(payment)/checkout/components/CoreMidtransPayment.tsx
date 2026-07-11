import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosJWT } from "@/lib/axios";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { removeOrder } from "@/redux/features/orders/orderSlice";
import { removePaymentAfterPaid } from "@/redux/features/payments/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Loader2, QrCode, RefreshCw } from "lucide-react";
import formatPrice from "@/lib/rupiah";

const CoreMidtransPayment = () => {
  const { data } = useAppSelector((state) => state.payment);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleSuccessRedirect = () => {
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
      dispatch(removeAllCart());
      dispatch(removeOrder());
      dispatch(removePaymentAfterPaid());
    }, 3000);
  };

  const autoCheckStatus = async () => {
    if (!data?.order_id || isSuccess) return;
    try {
      const res = await axiosJWT.get(`/api/payments/status/${data?.order_id}`);
      const result = res.data;
      if (result.transaction_status === "settlement") {
        handleSuccessRedirect();
      }
    } catch (error) {
      console.error("Auto status check failed:", error);
    }
  };

  // Poll for payment status every 3 seconds
  useEffect(() => {
    if (!data?.order_id) return;
    const interval = setInterval(() => {
      autoCheckStatus();
    }, 3000);
    return () => clearInterval(interval);
  }, [data?.order_id, isSuccess]);

  const handleCheckStatus = async () => {
    if (isChecking) return;
    setIsChecking(true);
    try {
      const res = await axiosJWT.get(`/api/payments/status/${data?.order_id}`);
      const result = res.data;

      if (result.transaction_status === "settlement") {
        handleSuccessRedirect();
      } else if (result.transaction_status === "pending") {
        toast.info("Payment still pending. Please complete the payment on your device.");
      } else {
        toast.error(`Payment status: ${result.transaction_status}`);
      }
    } catch (error) {
      console.error("Error checking status:", error);
      toast.error("Failed to check status. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
        <style>{`
          @keyframes drawCircle {
            to { stroke-dashoffset: 0; }
          }
          @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
          }
          @keyframes scaleIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-scale-in {
            animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .animate-slide-up {
            animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
            opacity: 0;
          }
        `}</style>
        <div className="flex flex-col items-center max-w-sm w-full text-center">
          <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center shadow-inner animate-scale-in mb-6">
            <svg className="w-16 h-16 text-emerald-500" viewBox="0 0 52 52">
              <circle
                className="stroke-emerald-500 fill-none"
                cx="26"
                cy="26"
                r="25"
                strokeWidth="3"
                strokeDasharray="157"
                strokeDashoffset="157"
                style={{ animation: 'drawCircle 0.6s ease-in-out forwards' }}
              />
              <path
                className="stroke-emerald-500 fill-none"
                d="M14 27l7.5 7.5 16.5-16.5"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="48"
                strokeDashoffset="48"
                style={{ animation: 'drawCheck 0.4s ease-in-out 0.5s forwards' }}
              />
            </svg>
          </div>
          <div className="animate-slide-up space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
            <p className="text-gray-500">Thank you for your order. The transaction has been settled successfully.</p>
            <div className="pt-6">
              <div className="inline-flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium">
                <Loader2 className="h-3 w-3 animate-spin" />
                Redirecting to dashboard...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-md mx-auto w-full">
      <style>{`
        @keyframes scanBeam {
          0%, 100% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 0.8; }
        }
        .scanner-beam {
          animation: scanBeam 2.5s ease-in-out infinite;
        }
      `}</style>

      <Card className="w-full bg-white border border-gray-100 shadow-xl rounded-3xl overflow-hidden mt-4">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 flex flex-col items-center py-6 text-center">
          <div className="p-3 bg-emerald-50 rounded-full text-emerald-600 mb-2">
            <QrCode className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">Kopikan Coffee</CardTitle>
          <CardDescription className="text-sm font-medium text-gray-400 mt-1">
            Order ID: {data?.order_id}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center p-8">
          {/* QR Code Container with scanning animation */}
          <div className="relative p-4 bg-gray-50 rounded-2xl border border-gray-100/80 mb-6 group">
            <div className="relative w-[260px] h-[260px] overflow-hidden rounded-xl bg-white shadow-inner flex items-center justify-center">
              {data?.qrUrl ? (
                <>
                  {/* Laser Beam Scanner Effect */}
                  <div className="absolute left-0 w-full h-[2px] bg-emerald-500 shadow-[0_0_10px_#10b981] scanner-beam pointer-events-none z-10" />
                  <Image
                    src={data.qrUrl}
                    width={240}
                    height={240}
                    alt="QRCODE-PAYMENT"
                    className="object-contain"
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="text-xs">Generating QR Code...</span>
                </div>
              )}
            </div>
            {/* Corner Decorative Borders */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-500 rounded-tl" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-500 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-500 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-500 rounded-br" />
          </div>

          <div className="text-center space-y-1 w-full bg-gray-50/50 py-4 px-6 rounded-2xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Payment</span>
            <div className="text-2xl font-bold text-gray-800">
              {data?.amount ? formatPrice(Number(data.amount)) : "Rp 0"}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="w-full mt-6 space-y-3">
        <Button
          onClick={handleCheckStatus}
          disabled={isChecking}
          className="w-full py-6 rounded-full text-base font-bold bg-hijaugelap hover:bg-hijaugelap/90 text-white shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {isChecking ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCw className="h-5 w-5" />
          )}
          {isChecking ? "Checking Status..." : "Check Payment Status"}
        </Button>
        
        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Waiting for your payment... We check automatically.
        </p>
      </div>
    </div>
  );
};

export default CoreMidtransPayment;
