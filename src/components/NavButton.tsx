"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  href: string;
  icon?: string | StaticImageData | React.ComponentType<{ className?: string }>;
  label: string;
  exactMatch?: boolean;
  activePrefix?: string;
  className?: string;
}

export function NavButton({
  href,
  icon,
  label,
  exactMatch = false,
  activePrefix,
  className,
}: NavButtonProps) {
  const pathname = usePathname();
  const getIsActive = () => {
    if (exactMatch) return pathname === href;
    if (activePrefix) return pathname.startsWith(activePrefix);
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isActive = getIsActive();

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "flex items-center w-full transition-all duration-200 justify-start",
        icon
          ? cn(
              "h-14 px-4 gap-4 rounded-xl text-base font-medium",
              isActive
                ? "bg-hijaugelap/20 text-hijaugelap font-semibold"
                : "bg-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900",
            )
          : cn(
              "h-12 px-4 rounded-xl text-sm font-medium",
              isActive
                ? "bg-hijaugelap text-white font-semibold hover:bg-hijaugelap/80 hover:text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900",
            ),
        className,
      )}
    >
      <Link href={href} aria-current={isActive ? "page" : undefined}>
        {icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-full flex justify-center items-center shrink-0 transition-colors duration-200",
              isActive
                ? "bg-hijaugelap text-white"
                : "bg-gray-100 text-gray-600 group-hover:bg-gray-200",
            )}
          >
            {typeof icon === "function" || (typeof icon === "object" && !("src" in icon)) ? (
              (() => {
                const IconComponent = icon as React.ComponentType<{ className?: string }>;
                return <IconComponent className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-600")} />;
              })()
            ) : (
              <div className="relative w-5 h-5">
                <Image
                  src={(icon as string | StaticImageData) || "/placeholder.svg"}
                  alt={label}
                  fill
                  className={cn(
                    "transition-all duration-200 object-contain",
                    isActive
                      ? "brightness-0 invert"
                      : "opacity-60 group-hover:opacity-80",
                  )}
                />
              </div>
            )}
          </div>
        )}
        <div className="tracking-tight leading-tight">{label}</div>
      </Link>
    </Button>
  );
}
