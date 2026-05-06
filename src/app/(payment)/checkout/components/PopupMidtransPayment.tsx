import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/lib/icons";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    snap: any;
  }
}

const PopupMidtransPaymentPage = () => {
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const { dataOrder } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const script = document.createElement("script");
    const serverKey = process.env.NEXT_PUBLIC_CLIENT;
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // or production
    script.setAttribute("data-client-key", serverKey!);
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getSnapToken = async () => {
    if (!dataOrder || !dataOrder.data || !dataOrder.data.id) {
      console.error("dataOrder is null or missing required fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/midpayment",
        {
          order_id: dataOrder.data.id,
          gross_amount: dataOrder.data.total,
          customer_name: user?.name,
          customer_email: user?.email,
        },
      );

      const data = response.data;
      setSnapToken(data.snapToken);
    } catch (error) {
      console.error("Error fetching snap token:", error);
    }
  };
  console.log(snapToken);

  const handlePayment = () => {
    if (!snapToken) {
      getSnapToken();
    }

    // Ensure snapToken is set before calling embed
    if (window.snap && snapToken) {
      window.snap.embed(snapToken, {
        embedId: "snap-container",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: function (result: any) {
          console.log("success", result);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onPending: function (result: any) {
          console.log("pending", result);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: function (result: any) {
          console.log("error", result);
        },
        onClose: function () {
          console.log(
            "customer closed the popup without finishing the payment",
          );
        },
      });
    }
  };

  return (
    <div className="w-[377px] h-[470px]">
      <div className="overflow-y-scroll h-[470px] flex justify-center">
        <div id="snap-container"></div>
      </div>
      {
        <Button
          className="w-full bg-hijaugelap flex justify-between pl-5 pr-[10px] py-3 text-base"
          onClick={handlePayment}
        >
          <div className="font-bold">Rp. {dataOrder?.data.total}</div>
          <div className="flex gap-[5px] justify-between items-center">
            <span className="font-normal">Pay</span>
            <Image
              src={ArrowRight}
              alt="Arrow Right Icon"
              width={24}
              unoptimized
            />
          </div>
        </Button>
      }
    </div>
  );
};

export default PopupMidtransPaymentPage;
