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

  const isNewOrderActive = pathname === "/new-order";
  const isDashboardActive = pathname === "/dashboard";
  const isOnlineOrderActive = pathname === "/online-order";
  const isSettingActive = pathname === "/setting";
  const isLogoutActive = pathname === "/logout";

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
            isNewOrderActive
              ? "bg-hijaugelap text-white"
              : "bg-white text-black"
          }`}
          onClick={() => router.push("/new-order")}
        >
          <Image
            src={newOrder}
            alt="New Order"
            className={`${
              isNewOrderActive
                ? "invert group-hover:invert"
                : "group-hover:invert"
            }`}
          />
          <div className="text-[12px] text-center">New Order</div>
        </Button>
        <Button
          className={`flex group flex-col justify-center items-center w-20 h-20 p-[10px] text-black gap-[10px] rounded hover:bg-hijaugelap hover:text-white ${
            isDashboardActive
              ? "bg-hijaugelap text-white"
              : "bg-white text-black"
          }`}
          onClick={() => router.push("/dashboard")}
        >
          <Image
            src={dashboard}
            alt="New Order"
            className={`${
              isDashboardActive
                ? "invert group-hover:invert"
                : "group-hover:invert"
            }`}
          />
          <div className="text-[12px] text-center">Dashboard</div>
        </Button>
        <Button
          className={`flex group flex-col justify-center items-center w-20 h-20 p-[10px] text-black gap-[10px] rounded hover:bg-hijaugelap hover:text-white ${
            isOnlineOrderActive
              ? "bg-hijaugelap text-white"
              : "bg-white text-black"
          }`}
          onClick={() => router.push("/online-order")}
        >
          <Image
            src={onlineOrder}
            alt="New Order"
            className={`${
              isOnlineOrderActive
                ? "invert group-hover:invert"
                : "group-hover:invert"
            }`}
          />
          <div className="text-[12px] text-center">Online Order</div>
        </Button>
        <Button
          className={`flex group flex-col justify-center items-center w-20 h-20 p-[10px] text-black gap-[10px] rounded hover:bg-hijaugelap hover:text-white ${
            isSettingActive ? "bg-hijaugelap text-white" : "bg-white text-black"
          }`}
          onClick={() => router.push("/setting")}
        >
          <Image
            src={settings}
            alt="New Order"
            className={`${
              isSettingActive
                ? "invert group-hover:invert"
                : "group-hover:invert"
            }`}
          />
          <div className="text-[12px] text-center">Setting</div>
        </Button>
        <Button
          className={`flex group flex-col justify-center items-center w-20 h-20 p-[10px] text-black gap-[10px] rounded hover:bg-hijaugelap hover:text-white ${
            isLogoutActive ? "bg-hijaugelap text-white" : "bg-white text-black"
          }`}
          onClick={() => router.push("/logout")}
        >
          <Image
            src={logout}
            alt="New Order"
            className={`${
              isLogoutActive
                ? "invert group-hover:invert"
                : "group-hover:invert"
            }`}
          />
          <div className="text-[12px] text-center">Logout</div>
        </Button>
      </div>
    </div>
  );
};

export default SidebarBase;
