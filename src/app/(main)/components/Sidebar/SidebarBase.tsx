"use client";

import Image from "next/image";
import Link from "next/link";
import { NavButton } from "@/components/NavButton";
import { dashboard, logout, newOrder, onlineOrder } from "@/lib/icons";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SidebarBase = () => {
  const { user, logout: logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <aside className="flex flex-col justify-between h-screen w-[130px] py-8 bg-white border-r border-gray-100 shadow-sm">
      {/* Top Content: Logo & Navigation */}
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

        {/* Nav Links */}
        <nav className="flex flex-col gap-5 items-center">
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
          />

          {/* Logout Action */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-col group justify-center items-center w-20 h-20 p-[10px] gap-2 rounded-xl bg-white transition-all duration-300 hover:bg-hijaugelap hover:text-white hover:shadow-md"
              >
                <Image
                  src={logout}
                  alt="Logout"
                  width={24}
                  height={24}
                  className="transition-all group-hover:invert"
                />
                <div className="text-[12px] text-center font-medium">
                  Logout
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[320px] bg-white p-6 rounded-2xl border-none shadow-2xl">
              <DialogHeader className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-2">
                  <Image
                    src={logout}
                    alt="Logout"
                    width={24}
                    height={24}
                    className="opacity-70"
                  />
                </div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Sign Out?
                </DialogTitle>
                <p className="text-sm text-gray-500 text-center">
                  Are you sure you want to log out of your account?
                </p>
              </DialogHeader>
              <div className="flex gap-3 mt-4">
                <DialogClose asChild>
                  <Button className="flex-1 rounded-xl h-11" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl h-11 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </nav>
      </div>

      {/* Bottom Content: User Profile */}
      <div className="px-4 flex flex-col items-center mb-4 w-full">
        <div className="w-full py-3 bg-gray-50 rounded-2xl flex flex-col items-center border border-gray-100">
          <div className="text-[13px] font-bold text-gray-800 truncate px-2 w-full text-center">
            {user?.name || "Employee"}
          </div>
          <div className="text-[10px] text-hijaugelap font-bold uppercase tracking-wider mt-0.5">
            {user?.role_name || "Staff"}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarBase;
