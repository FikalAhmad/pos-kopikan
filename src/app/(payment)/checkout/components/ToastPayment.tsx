"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { CeklisIcon } from "@/lib/icons";

export default function AnimatedToast() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button onClick={() => setShowToast(true)}>Show Toast</Button>
      <div
        className="fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out"
        style={{
          opacity: showToast ? 1 : 0,
          transform: showToast ? "scale(1)" : "scale(0.8)",
        }}
      >
        {showToast && (
          <Card className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl w-[300px] h-[300px] justify-center gap-8">
            <Image src={CeklisIcon} alt="Check Icon" className="w-24 h-24" />
            <span className="font-semibold text-lg mt-2">
              Payment Successful
            </span>
          </Card>
        )}
      </div>
    </div>
  );
}
