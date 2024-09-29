"use client";

import Image from "next/image";
import kopikanLogo from "@/public/assets/logo/logo-cup-hijau.png";
import newOrder from "@/public/assets/images/newOrder.svg";
import dashboard from "@/public/assets/images/dashboard.svg";
import onlineOrder from "@/public/assets/images/onlineOrders.svg";
import settings from "@/public/assets/images/settings.svg";
import logout from "@/public/assets/images/logout.svg";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const SidebarBase = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardActive = pathname === "/dashboard";

  const sidebarItem = [
    {
      image: newOrder,
      name: "New Order",
    },
    {
      image: dashboard,
      name: "Dashboard",
    },
    {
      image: onlineOrder,
      name: "Online Order",
    },
    {
      image: settings,
      name: "Settings",
    },
    {
      image: logout,
      name: "Logout",
    },
  ];

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
        {sidebarItem.map((item, index) => {
          return (
            <Button
              key={index + 1}
              className={`flex group flex-col justify-center items-center w-20 h-20 p-[10px] text-black gap-[10px] rounded hover:bg-hijaugelap hover:text-white ${
                isDashboardActive
                  ? "bg-hijaugelap text-white"
                  : "bg-white text-white"
              }`}
              onClick={() => router.push("/dashboard")}
            >
              <Image
                src={item.image}
                alt="New Order"
                className={`${
                  isDashboardActive && "invert group-hover:invert"
                }`}
              />
              <div className="text-[12px] text-center">{item.name}</div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarBase;
