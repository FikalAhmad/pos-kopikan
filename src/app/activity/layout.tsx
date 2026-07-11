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

import ActivitySidebar from "./_components/ActivitySidebar";
import ActivityTopbar from "./_components/ActivityTopbar";

export default function ActivityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col w-full px-4 flex-1 overflow-hidden bg-gray-50">
      <ActivityTopbar />
      <div className="flex gap-2 h-full overflow-hidden">
        <ActivitySidebar />
        {children}
      </div>
    </div>
  );
}
