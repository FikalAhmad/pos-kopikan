"use client";

import Image from "next/image";
import Link from "next/link";
import { NavButton } from "./NavButton";
import {
  dashboard,
  kopikanLogo,
  logout,
  newOrder,
  onlineOrder,
  settings,
} from "@/lib/icons";

const SidebarBase = () => {
  return (
    <div className="w-[130px] h-screen pt-5 flex flex-col gap-3 items-center">
      <Link href={"/"}>
        <Image
          src={kopikanLogo}
          alt="Kopikan Logo"
          width={102}
          height={102}
          priority
        />
      </Link>
      <NavButton
        href="/neworder/signature"
        icon={newOrder}
        label="New Order"
        exactMatch
      />
      <NavButton
        href="/dashboard"
        icon={dashboard}
        label="Dashboard"
        exactMatch
      />
      <NavButton
        href="/onlineorder"
        icon={onlineOrder}
        label="Online Order"
        exactMatch
      />
      <NavButton href="/setting" icon={settings} label="Setting" exactMatch />
      <NavButton href="/logout" icon={logout} label="Logout" exactMatch />
    </div>
  );
};

export default SidebarBase;
