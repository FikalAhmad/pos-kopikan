// import type { Metadata } from "next";
import SidebarBase from "./components/Sidebar/SidebarBase";

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
  return (
    <div className="flex justify-between gap-6 w-[768px] lg:w-[1024px] shadow-xl px-4">
      <SidebarBase />
      <div>{children}</div>
    </div>
  );
}
