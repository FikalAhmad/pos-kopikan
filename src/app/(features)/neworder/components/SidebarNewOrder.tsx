"use client";

import Image from "next/image";
import kopikanLogo from "@/public/assets/logo/logo-cup-hijau.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import signatureIcon from "@/public/assets/images/drinks.svg";
import coffeeIcon from "@/public/assets/images/coffee.svg";
import nonCoffeeIcon from "@/public/assets/images/dessert.svg";

const enum Beverage {
  Signature = "Signature",
  Coffee = "Coffee",
  NonCoffee = "Non-Coffee",
}

const SidebarNewOrder = () => {
  const [beverage, setBeverage] = useState<Beverage>(Beverage.Signature);

  return (
    <div className="w-[130px] h-screen pt-5 flex flex-col gap-3 items-center">
      <Image
        src={kopikanLogo}
        alt="Kopikan Logo"
        width={102}
        height={102}
        priority
      />
      <div className="flex flex-col gap-6">
        <Button
          className={`flex group flex-col justify-center items-center w-20 h-20 p-[10px] text-black gap-[10px] rounded hover:bg-hijaugelap hover:text-white ${
            beverage == Beverage.Signature
              ? "bg-hijaugelap text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setBeverage(Beverage.Signature)}
        >
          <Image
            src={signatureIcon}
            alt="Signature"
            className={`${
              beverage == Beverage.Signature
                ? "invert group-hover:invert"
                : "group-hover:invert"
            }`}
          />
          <div className="text-[12px] text-center">Signature</div>
        </Button>
        <Button
          className={`flex group flex-col justify-center items-center w-20 h-20 p-[10px] text-black gap-[10px] rounded hover:bg-hijaugelap hover:text-white ${
            beverage == Beverage.Coffee
              ? "bg-hijaugelap text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setBeverage(Beverage.Coffee)}
        >
          <Image
            src={coffeeIcon}
            alt="Coffee"
            className={`${
              beverage == Beverage.Coffee
                ? "invert group-hover:invert"
                : "group-hover:invert"
            }`}
          />
          <div className="text-[12px] text-center">Coffee</div>
        </Button>
        <Button
          className={`flex group flex-col justify-center items-center w-20 h-20 p-[10px] text-black gap-[10px] rounded hover:bg-hijaugelap hover:text-white ${
            beverage == Beverage.NonCoffee
              ? "bg-hijaugelap text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setBeverage(Beverage.NonCoffee)}
        >
          <Image
            src={nonCoffeeIcon}
            alt="Non Coffee"
            className={`${
              beverage == Beverage.NonCoffee
                ? "invert group-hover:invert"
                : "group-hover:invert"
            }`}
          />
          <div className="text-[12px] text-center">Non Coffee</div>
        </Button>
      </div>
    </div>
  );
};

export default SidebarNewOrder;
