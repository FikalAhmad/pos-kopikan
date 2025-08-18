import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const CoreMidtransPayment = () => {
  return (
    <Card className="mt-3">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Kopikan Coffee</CardTitle>
        <CardDescription className="flex flex-col items-center">
          <div>Cashier</div>
          <div>Order ID: 325823509238</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div>
          <Image
            src={
              "https://api.sandbox.midtrans.com/v2/gopay/88264bd5-e728-407d-aa5f-06602313c38c/qr-code"
            }
            width={300}
            height={300}
            alt="QRCODE-PAYMENT"
          />
        </div>
        <CardDescription>Total Payment</CardDescription>
        <div className="font-bold">IDR 10000</div>
      </CardContent>
    </Card>
  );
};

export default CoreMidtransPayment;
