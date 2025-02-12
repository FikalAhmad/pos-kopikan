"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  href: string;
  icon: string;
  label: string;
  exactMatch?: boolean;
}

export function NavButton({
  href,
  icon,
  label,
  exactMatch = false,
}: NavButtonProps) {
  const pathname = usePathname();
  const isActive = exactMatch ? pathname === href : pathname.startsWith(href);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "flex flex-col group justify-center items-center w-20 h-20 p-[10px] gap-[10px] rounded bg-white",
        "hover:bg-hijaugelap hover:text-white",
        isActive && "bg-hijaugelap text-white"
      )}
    >
      <Link href={href}>
        <Image
          src={icon || "/placeholder.svg"}
          alt={label}
          width={24}
          height={24}
          className={cn(
            "transition-all",
            isActive ? "invert" : "group-hover:invert"
          )}
        />
        <div className="text-[12px] text-center">{label}</div>
      </Link>
    </Button>
  );
}
