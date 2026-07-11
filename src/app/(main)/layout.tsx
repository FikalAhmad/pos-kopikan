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

import CalendarFilter from "@/components/CalendarFilter";
import DownloadReport from "@/components/DownloadReport";
import OrderToggle from "@/components/OrderToggle";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col w-full px-4 flex-1 overflow-hidden bg-gray-50">
      <div className="flex items-center justify-between gap-2 py-2">
        <div className="flex items-center gap-5">
          <Sidebar />
          <span className="text-2xl font-medium">Report</span>
        </div>
        <div className="flex items-center gap-3">
          <DownloadReport />
          <CalendarFilter />
          <OrderToggle />
        </div>
      </div>
      <div className="flex-1 h-full overflow-hidden">{children}</div>
    </div>
  );
}
