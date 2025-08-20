import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";

const CoreMidtransPayment = () => {
  const { data } = useAppSelector((state) => state.payment);
  console.log(data);

  return (
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
  );
};

export default CoreMidtransPayment;
