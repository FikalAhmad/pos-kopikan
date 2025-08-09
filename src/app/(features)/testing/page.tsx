import { Card } from "@/components/ui/card";
import { CeklisIcon } from "@/lib/icons";
import Image from "next/image";
import React from "react";

const TestingPage = () => {
  return (
    <div className="border-2 border-red-600">
      <Card className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl w-[300px] h-[300px] justify-center gap-8">
        <Image src={CeklisIcon} alt="Check Icon" className="w-24 h-24" />
        <span className="font-semibold text-lg mt-2">Payment Successful</span>
      </Card>
    </div>
  );
};

export default TestingPage;
