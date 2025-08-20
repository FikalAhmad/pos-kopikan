// import type { Metadata } from "next";
import SidebarNewOrder from "./neworder/[category]/components/SidebarNewOrder";

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

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-evenly gap-1 lg:gap-6 w-[768px] lg:w-[1024px] px-4 bg-gray-200">
      <SidebarNewOrder />
      <div>{children}</div>
    </div>
  );
}
