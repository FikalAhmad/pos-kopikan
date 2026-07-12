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

import ReportTopbar from "./components/ReportTopbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col w-full px-4 flex-1 overflow-hidden bg-gray-50">
      <ReportTopbar />
      <div className="flex-1 h-full overflow-hidden">{children}</div>
    </div>
  );
}
