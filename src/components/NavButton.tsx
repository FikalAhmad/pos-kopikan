"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  href: string;
  icon: string | StaticImageData;
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

  // Logic to determine active state, handling the "/" root case
  const isActive = exactMatch
    ? pathname === href
    : href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "flex flex-col group justify-center items-center w-20 h-20 p-[10px] gap-2 rounded-xl bg-white transition-all duration-300",
        "hover:bg-hijaugelap hover:text-white hover:shadow-md",
        isActive && "bg-hijaugelap text-white shadow-sm",
      )}
    >
      <Link href={href} aria-current={isActive ? "page" : undefined}>
        <div className="relative w-6 h-6">
          <Image
            src={icon || "/placeholder.svg"}
            alt={label}
            fill
            unoptimized
            className={cn(
              "transition-all duration-300 object-contain",
              isActive
                ? "brightness-0 invert"
                : "group-hover:brightness-0 group-hover:invert",
            )}
          />
        </div>
        <div
          className={cn(
            "text-[11px] text-center font-bold tracking-tight leading-tight",
            isActive ? "text-white" : "text-gray-500 group-hover:text-white",
          )}
        >
          {label}
        </div>
      </Link>
    </Button>
  );
}
