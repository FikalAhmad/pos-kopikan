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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-evenly gap-1 lg:gap-6 w-[768px] lg:w-[1024px] px-4 h-screen overflow-hidden bg-gray-200">
      <SidebarBase />
      <div className="flex-1 h-full overflow-hidden">{children}</div>
    </div>
  );
}
