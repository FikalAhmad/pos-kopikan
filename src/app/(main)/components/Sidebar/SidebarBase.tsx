"use client";

import Image from "next/image";
import Link from "next/link";
import { NavButton } from "../../../../components/NavButton";
import {
  dashboard,
  kopikanLogo,
  logout,
  newOrder,
  onlineOrder,
} from "@/lib/icons";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SidebarBase = () => {
  const { user, logout: logoutUser } = useAuth();
  const handleClick = () => {
    logoutUser();
  };
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="w-[130px] h-screen pt-10 flex flex-col gap-5 items-center">
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
        <Dialog>
          <DialogTrigger className="flex flex-col group justify-center items-center w-20 h-20 p-[10px] gap-[10px] rounded bg-white hover:bg-hijaugelap hover:text-white">
            <Image
              src={logout}
              alt={"Logout"}
              width={24}
              height={24}
              className="transition-all group-hover:invert"
            />
            <div className="text-[12px] text-center">Logout</div>
          </DialogTrigger>
          <DialogContent className="w-72 bg-white">
            <DialogHeader>
              <DialogTitle>Are you sure to logout?</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex justify-between gap-5">
              <DialogClose asChild>
                <Button className="w-full" variant={"outline"}>
                  No
                </Button>
              </DialogClose>
              <Button className="w-full" onClick={handleClick}>
                Yes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-2 px-4 py-2 bg-white rounded-lg flex flex-col items-center mb-5">
        <div className="text-xs font-bold">{user?.name}</div>
        <div className="text-xs text-gray-400">Cashier</div>
      </div>
    </div>
  );
};

export default SidebarBase;
