import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosJWT } from "@/lib/axios";
import { CeklisIcon } from "@/lib/icons";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { removeOrder } from "@/redux/features/orders/orderSlice";
import { removePaymentAfterPaid } from "@/redux/features/payments/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CoreMidtransPayment = () => {
  const { data } = useAppSelector((state) => state.payment);
  console.log(data?.qrUrl);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCheckStatus = async () => {
    try {
      const res = await axiosJWT.get(`/api/payments/status/${data?.order_id}`);
      const result = res.data;

      if (result.transaction_status === "settlement") {
        toast("", {
          description: (
            <Card className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl w-[300px] h-[300px] justify-center gap-8">
              <Image src={CeklisIcon} alt="Check Icon" className="w-24 h-24" />
              <span className="font-semibold text-lg mt-2">
                Payment Successful
              </span>
            </Card>
          ),
          className:
            "fixed flex items-center justify-center bg-transparent border-none shadow-none p-0",
          position: "top-center",
          duration: 2000,
        });

        setTimeout(() => {
          router.push("/dashboard");
          dispatch(removeAllCart());
          dispatch(removeOrder());
          dispatch(removePaymentAfterPaid());
        }, 2000);
      }
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <Card className="mt-3">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Kopikan Coffee</CardTitle>
          <CardDescription className="flex flex-col items-center">
            <div>Cashier</div>
            <div>Order ID: {data?.order_id}</div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div>
            {data?.qrUrl && (
              <Image
                src={data.qrUrl}
                width={300}
                height={300}
                alt="QRCODE-PAYMENT"
              />
            )}
          </div>
          <CardDescription>Total Payment</CardDescription>
          <div className="font-bold">IDR {data?.amount}</div>
        </CardContent>
      </Card>
      <Button onClick={handleCheckStatus}>Check Status</Button>
    </div>
  );
};

export default CoreMidtransPayment;
