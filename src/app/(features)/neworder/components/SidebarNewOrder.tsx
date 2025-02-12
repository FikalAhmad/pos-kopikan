import Image from "next/image";
import { coffeeIcon, kopikanLogo, nonCoffee, signatureIcon } from "@/lib/icons";
import { NavButton } from "../../components/Sidebar/NavButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SidebarNewOrder = () => {
  return (
    <div className="w-[130px] h-screen pt-5 flex flex-col gap-3 items-center">
      <Button variant="ghost">
        <Link href="/dashboard" className="flex gap-3 items-center font-bold">
          <ArrowLeft />
          Back
        </Link>
      </Button>
      <Image
        src={kopikanLogo}
        alt="Kopikan Logo"
        width={102}
        height={102}
        priority
      />
      <div className="flex flex-col gap-6">
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
      </div>
    </div>
  );
};

export default SidebarNewOrder;
