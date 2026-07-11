import { Download } from "lucide-react";
import { Button } from "./ui/button";

const DownloadReport = () => {
  return (
    <Button className="rounded-full gap-2 items-center bg-white text-hijaugelap h-12 pl-4 pr-1 hover:bg-gray-50 transition-colors cursor-pointer">
      <span>Download Report</span>
      <div className="w-8 h-8 rounded-full bg-hijaugelap flex items-center justify-center">
        <Download className="size-4 text-white" />
      </div>
    </Button>
  );
};

export default DownloadReport;
