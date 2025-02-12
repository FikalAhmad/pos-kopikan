import SettingIcon from "@/public/assets/images/settings.svg";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChartExample } from "./BarChartExample";
import { signature } from "@/lib/datadummy";

const StatisticDashboard = () => {
  const dataSignature = signature;

  return (
    <div className="flex flex-col py-[34px] px-[10px] gap-7 w-auto lg:w-[309px] bg-white h-screen shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl">
          <strong>Overall</strong> Statistics
        </div>
        <Image src={SettingIcon} alt="Setting Icon" />
      </div>
      <Tabs defaultValue="week" className="w-auto">
        <TabsList className="flex justify-between bg-transparent mb-[30px]">
          <TabsTrigger
            value="week"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-hijau"
          >
            This week
          </TabsTrigger>
          <TabsTrigger
            value="month"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-hijau"
          >
            This month
          </TabsTrigger>
          <TabsTrigger
            value="year"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm text-hijau"
          >
            This year
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[75vh]">
          <TabsContent value="week" className="flex flex-col gap-[30px]">
            <div>
              <BarChartExample data={dataSignature} label="Signature" />
            </div>
            <div>
              <BarChartExample data={dataSignature} label="Coffee" />
            </div>
            <div>
              <BarChartExample data={dataSignature} label="Non Coffee" />
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default StatisticDashboard;
