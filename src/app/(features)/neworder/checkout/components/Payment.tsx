"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CashIcon, CeklisIcon, EWalletIcon } from "@/lib/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Payment = () => {
  const showToast = () => {
    toast.success(
      <Card className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl w-[300px] h-[300px] justify-center gap-8">
        <Image src={CeklisIcon} alt="Check Icon" className="w-24 h-24" />
        <span className="font-semibold text-lg mt-2">Payment Successful</span>
      </Card>,
      { duration: 2000 }
    );
  };

  return (
    <div className="w-[417px] pt-[34px] px-[20px] pb-5 flex flex-col gap-6 bg-white h-screen shadow-md">
      <div className="flex justify-center">
        <div className="text-base font-bold">Payment</div>
      </div>

      <Tabs defaultValue="cash" className="w-auto mt-[30px]">
        <TabsList className="flex gap-5 bg-transparent mb-[30px]">
          <TabsTrigger
            value="cash"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-white text-sm font-bold p-5 flex flex-col gap-[10px] items-center w-28 hover:bg-hijaugelap hover:text-white bg-[#B8B8B8]"
          >
            <Image
              src={CashIcon}
              alt="Cash Icon"
              width={20}
              className="transition-all data-[state=active]:invert"
            />
            Cash
          </TabsTrigger>
          <TabsTrigger
            value="ewallet"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-white text-sm font-bold p-5 flex flex-col gap-[10px] items-center w-28 hover:bg-hijaugelap hover:text-white bg-[#B8B8B8]"
          >
            <Image
              src={EWalletIcon}
              alt="EWallet Icon"
              width={20}
              className="transition-all data-[state=active]:invert"
            />
            E-Wallet
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cash" className="flex flex-col w-[377px]">
          <div className="flex justify-center h-[65vh]">CASH</div>
          <Button
            className="bg-hijaugelap flex justify-between pl-5 pr-[10px] py-3 text-base"
            onClick={showToast}
          >
            {/* <Link
              href="/neworder/checkout"
              className="flex justify-between pl-5 pr-[10px] py-3 text-base"
            > */}
            <div className="font-bold">Rp.200.000.000</div>
            <div className="flex gap-[5px] justify-between items-center">
              <span className="font-normal">Pay</span>
              <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
            </div>
            {/* </Link> */}
          </Button>
        </TabsContent>
        <TabsContent value="ewallet" className="flex flex-col w-[377px]">
          <div className="flex justify-center h-[65vh]">
            <Image
              src={EWalletIcon}
              alt="EWallet Icon"
              width={300}
              className="invert"
            />
          </div>
          <Button
            className="bg-hijaugelap flex justify-between pl-5 pr-[10px] py-3 text-base"
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            }
          >
            {/* <Link
              href="/neworder/checkout"
              className="flex justify-between pl-5 pr-[10px] py-3 text-base"
            > */}
            <div className="font-bold">Rp.200.000.000</div>
            <div className="flex gap-[5px] justify-between items-center">
              <span className="font-normal">Pay</span>
              <Image src={ArrowRight} alt="Arrow Right Icon" width={24} />
            </div>
            {/* </Link> */}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payment;
