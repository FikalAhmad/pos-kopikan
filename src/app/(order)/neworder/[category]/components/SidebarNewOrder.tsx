"use client";

import Link from "next/link";
import Image from "next/image";
import { coffeeIcon, nonCoffee, signatureIcon, ArrowLeft } from "@/lib/icons";
import { NavButton } from "@/components/NavButton";
import { Button } from "@/components/ui/button";

const SidebarNewOrder = () => {
  return (
    <aside className="flex flex-col justify-between h-screen w-[130px] py-8 px-2 bg-white border-r border-gray-100 shadow-sm">
      {/* Top Content: Logo & Category Navigation */}
      <div className="flex flex-col items-center">
        {/* Branding */}
        <Link
          href="/"
          className="mb-12 flex flex-col items-center gap-2 group hover:opacity-90 transition-opacity"
        >
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-hijaugelap leading-none">
              Kopikan
            </span>
            <span className="text-[10px] text-gray-400 font-bold tracking-widest mt-0.5">
              POS SYSTEM
            </span>
          </div>
        </Link>

        {/* Nav Links (Categories) */}
        <nav className="flex flex-col gap-5 items-center">
          <NavButton
            href="/neworder/signature"
            icon={signatureIcon}
            label="Signature"
            exactMatch
          />
          <NavButton
            href="/neworder/coffee"
            icon={coffeeIcon}
            label="Coffee"
            exactMatch
          />
          <NavButton
            href="/neworder/noncoffee"
            icon={nonCoffee}
            label="Non Coffee"
            exactMatch
          />
        </nav>
      </div>

      {/* Bottom Content: Back Button & User Profile */}
      <div className="px-4 flex flex-col items-center gap-4 mb-4 w-full">
        {/* Back to Dashboard */}
        <Link href="/dashboard" className="w-full">
          <Button
            variant="outline"
            className="flex flex-col group justify-center items-center w-20 h-20 p-[10px] gap-2 rounded-xl bg-white transition-all duration-300 hover:bg-hijaugelap hover:text-white hover:shadow-md"
          >
            <Image
              src={ArrowLeft}
              alt="Back"
              width={24}
              height={24}
              className="transition-all group-hover:invert"
            />
            <div className="text-[12px] text-center font-medium">Back</div>
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default SidebarNewOrder;
