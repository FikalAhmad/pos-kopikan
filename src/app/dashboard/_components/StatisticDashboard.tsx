import SettingIcon from "@/public/assets/images/settings.svg";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";

const StatisticDashboard = () => {
  const signature = [
    {
      name: "Day 1",
      ArenLatte: 124,
      PandanLatte: 122,
      CaramelPralineMacchiato: 58,
      ButterscotchSeaSaltLatte: 210,
      NuttyOatLatte: 80,
    },
    {
      name: "Day 2",
      ArenLatte: 156,
      PandanLatte: 184,
      CaramelPralineMacchiato: 38,
      ButterscotchSeaSaltLatte: 190,
      NuttyOatLatte: 57,
    },
    {
      name: "Day 3",
      ArenLatte: 198,
      PandanLatte: 154,
      CaramelPralineMacchiato: 99,
      ButterscotchSeaSaltLatte: 230,
      NuttyOatLatte: 30,
    },
    {
      name: "Day 4",
      ArenLatte: 115,
      PandanLatte: 134,
      CaramelPralineMacchiato: 58,
      ButterscotchSeaSaltLatte: 150,
      NuttyOatLatte: 20,
    },
    {
      name: "Day 5",
      ArenLatte: 156,
      PandanLatte: 184,
      CaramelPralineMacchiato: 38,
      ButterscotchSeaSaltLatte: 190,
      NuttyOatLatte: 57,
    },
    {
      name: "Day 6",
      ArenLatte: 115,
      PandanLatte: 134,
      CaramelPralineMacchiato: 58,
      ButterscotchSeaSaltLatte: 150,
      NuttyOatLatte: 20,
    },
    {
      name: "Day 7",
      ArenLatte: 124,
      PandanLatte: 122,
      CaramelPralineMacchiato: 58,
      ButterscotchSeaSaltLatte: 210,
      NuttyOatLatte: 80,
    },
  ];

  return (
    <div className="flex flex-col py-[34px] px-[10px] gap-[30px] bg-white shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl">
          <strong>Overall</strong> Statistics
        </div>
        <Image src={SettingIcon} alt="Setting Icon" />
      </div>
      <Tabs defaultValue="week" className="w-[400px]">
        <TabsList className="flex justify-between gap-10 bg-transparent mb-[30px]">
          <TabsTrigger
            value="week"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm"
          >
            This week
          </TabsTrigger>
          <TabsTrigger
            value="month"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm"
          >
            This month
          </TabsTrigger>
          <TabsTrigger
            value="year"
            className="data-[state=active]:bg-hijaugelap data-[state=active]:text-white shadow-sm"
          >
            This year
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[73vh]">
          <TabsContent value="week" className="flex flex-col gap-[30px]">
            <div>
              <div className="text-lg font-bold">Signature</div>
              <ResponsiveContainer
                width="100%"
                height={500}
                className="text-xs"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={signature}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                  <Legend />
                  <Bar
                    dataKey="ArenLatte"
                    fill="#8884d8"
                    // activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar dataKey="PandanLatte" fill="#82ca9d" />
                  <Bar dataKey="CaramelPralineMacchiato" fill="brown" />
                  <Bar dataKey="ButterscotchSeaSaltLatte" fill="red" />
                  <Bar dataKey="NuttyOatLatte" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-lg font-bold">Coffee</div>
              <ResponsiveContainer
                width="100%"
                height={500}
                className="text-xs"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={signature}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                  <Legend />
                  <Bar
                    dataKey="ArenLatte"
                    fill="#8884d8"
                    // activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar dataKey="PandanLatte" fill="#82ca9d" />
                  <Bar dataKey="CaramelPralineMacchiato" fill="brown" />
                  <Bar dataKey="ButterscotchSeaSaltLatte" fill="red" />
                  <Bar dataKey="NuttyOatLatte" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-lg font-bold">Non Coffee</div>
              <ResponsiveContainer
                width="100%"
                height={500}
                className="text-xs"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={signature}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                  <Legend />
                  <Bar
                    dataKey="ArenLatte"
                    fill="#8884d8"
                    // activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar dataKey="PandanLatte" fill="#82ca9d" />
                  <Bar dataKey="CaramelPralineMacchiato" fill="brown" />
                  <Bar dataKey="ButterscotchSeaSaltLatte" fill="red" />
                  <Bar dataKey="NuttyOatLatte" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="month" className="flex flex-col gap-[30px] mt-0">
            <div>
              <div className="text-lg font-bold">Signature</div>
              <ResponsiveContainer
                width="100%"
                height={500}
                className="text-xs"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={signature}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                  <Legend />
                  <Bar
                    dataKey="ArenLatte"
                    fill="#8884d8"
                    // activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar dataKey="PandanLatte" fill="#82ca9d" />
                  <Bar dataKey="CaramelPralineMacchiato" fill="brown" />
                  <Bar dataKey="ButterscotchSeaSaltLatte" fill="red" />
                  <Bar dataKey="NuttyOatLatte" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-lg font-bold">Coffee</div>
              <ResponsiveContainer
                width="100%"
                height={500}
                className="text-xs"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={signature}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                  <Legend />
                  <Bar
                    dataKey="ArenLatte"
                    fill="#8884d8"
                    // activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar dataKey="PandanLatte" fill="#82ca9d" />
                  <Bar dataKey="CaramelPralineMacchiato" fill="brown" />
                  <Bar dataKey="ButterscotchSeaSaltLatte" fill="red" />
                  <Bar dataKey="NuttyOatLatte" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-lg font-bold">Non Coffee</div>
              <ResponsiveContainer
                width="100%"
                height={500}
                className="text-xs"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={signature}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                  <Legend />
                  <Bar
                    dataKey="ArenLatte"
                    fill="#8884d8"
                    // activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar dataKey="PandanLatte" fill="#82ca9d" />
                  <Bar dataKey="CaramelPralineMacchiato" fill="brown" />
                  <Bar dataKey="ButterscotchSeaSaltLatte" fill="red" />
                  <Bar dataKey="NuttyOatLatte" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="year" className="flex flex-col gap-[30px] mt-0">
            <div>
              <div className="text-lg font-bold">Signature</div>
              <ResponsiveContainer
                width="100%"
                height={500}
                className="text-xs"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={signature}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                  <Legend />
                  <Bar
                    dataKey="ArenLatte"
                    fill="#8884d8"
                    // activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar dataKey="PandanLatte" fill="#82ca9d" />
                  <Bar dataKey="CaramelPralineMacchiato" fill="brown" />
                  <Bar dataKey="ButterscotchSeaSaltLatte" fill="red" />
                  <Bar dataKey="NuttyOatLatte" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-lg font-bold">Coffee</div>
              <ResponsiveContainer
                width="100%"
                height={500}
                className="text-xs"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={signature}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                  <Legend />
                  <Bar
                    dataKey="ArenLatte"
                    fill="#8884d8"
                    // activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar dataKey="PandanLatte" fill="#82ca9d" />
                  <Bar dataKey="CaramelPralineMacchiato" fill="brown" />
                  <Bar dataKey="ButterscotchSeaSaltLatte" fill="red" />
                  <Bar dataKey="NuttyOatLatte" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-lg font-bold">Non Coffee</div>
              <ResponsiveContainer
                width="100%"
                height={500}
                className="text-xs"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={signature}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                  <Legend />
                  <Bar
                    dataKey="ArenLatte"
                    fill="#8884d8"
                    // activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar dataKey="PandanLatte" fill="#82ca9d" />
                  <Bar dataKey="CaramelPralineMacchiato" fill="brown" />
                  <Bar dataKey="ButterscotchSeaSaltLatte" fill="red" />
                  <Bar dataKey="NuttyOatLatte" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default StatisticDashboard;
