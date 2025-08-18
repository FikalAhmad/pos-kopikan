"use client";
// import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import SidebarBase from "./components/Sidebar/SidebarBase";
import SidebarNewOrder from "./components/Sidebar/SidebarNewOrder";

// export async function generateMetadata({
//   params,
// }: {
//   params: { feature: string };
// }): Promise<Metadata> {
//   return {
//     title: `Kopikan POS - ${params.feature}`,
//     description: `Informasi tentang fitur ${params.feature} di Kopikan POS`,
//   };
// }

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="flex justify-evenly gap-1 lg:gap-6 w-[768px] lg:w-[1024px] px-4 bg-gray-200">
      {pathname.startsWith("/neworder") ? <SidebarNewOrder /> : <SidebarBase />}
      <div>{children}</div>
    </div>
  );
}
