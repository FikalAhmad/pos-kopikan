"use client";

import Image from "next/image";
import { NavButton } from "@/components/NavButton";
import {
  dashboard,
  newOrder,
  onlineOrder,
  settings,
  logout as logoutIcon,
} from "@/lib/icons";
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
import { EqualIcon, X, Boxes, Users } from "lucide-react";
import placeholderimage from "@/app/favicon.ico";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { removeAllCart } from "@/redux/features/carts/cartSlice";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(removeAllCart({ silent: true }));
      toast.success("Logout has been success!");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
      <SheetTrigger asChild>
        <Button
          className="w-12 h-12 p-0 bg-white rounded-full hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-center border-gray-200 shrink-0"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <EqualIcon className="w-5 h-5 text-hijaugelap" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-none p-0 w-1/5"
        hideCloseButton
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Main navigation for the POS Kopikan application.
        </SheetDescription>
        <aside className="flex flex-col justify-between h-screen bg-white shadow-sm">
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-center w-full p-4 justify-between gap-2">
              <div className="flex-1 py-2 bg-gray-100 rounded-full flex items-start gap-3">
                <div>
                  <Image
                    src={placeholderimage}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-gray-800 truncate">
                    {user?.name || "Employee"}
                  </div>
                  <div className="text-[8px] text-hijaugelap font-bold uppercase tracking-wider mt-0.5">
                    {(user &&
                      (typeof user.role === "object"
                        ? user.role.role_name
                        : user.role)) ||
                      "Staff"}
                  </div>
                </div>
              </div>
              <SheetClose asChild>
                <Button
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  variant={"destructive"}
                  size={"icon"}
                >
                  <X className="size-5" />
                </Button>
              </SheetClose>
            </div>

            <nav className="flex flex-col gap-2 p-3 w-full">
              <NavButton
                href="/neworder"
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
                href="/activity/billing-queue"
                icon={onlineOrder}
                label="Activity"
                activePrefix="/activity"
              />
              <NavButton
                href="/inventory"
                icon={Boxes}
                label="Inventory"
                activePrefix="/inventory"
              />
              <NavButton
                href="/teams"
                icon={Users}
                label="Teams"
                activePrefix="/teams"
              />
              <NavButton
                href="/settings"
                icon={settings}
                label="Settings"
                activePrefix="/settings"
              />
            </nav>
            <Dialog>
              <DialogTrigger asChild>
                <div className="py-2 px-4 bg-gray-100 rounded-full flex cursor-pointer justify-between items-center gap-3 m-4">
                  <div className="text-sm font-bold text-gray-800 truncate">
                    Log Out
                  </div>
                  <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground shrink-0">
                    <Image
                      src={logoutIcon}
                      alt="Logo"
                      width={20}
                      height={20}
                      className="brightness-0 invert"
                    />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[320px] bg-white p-6 rounded-2xl border-none shadow-2xl">
                <DialogHeader className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-2">
                    <Image
                      src={logoutIcon}
                      alt="Logout"
                      width={24}
                      height={24}
                      className="opacity-70"
                    />
                  </div>
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    Sign Out?
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500 text-center">
                    Are you sure you want to log out of your account?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 mt-4">
                  <DialogClose asChild>
                    <Button
                      className="flex-1 rounded-xl h-11"
                      variant="outline"
                    >
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
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
