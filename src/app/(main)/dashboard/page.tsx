import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "lucide-react";

const ReportPage = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between bg-white rounded-lg px-4 py-2">
        <div className="flex gap-2 items-center">
          <div>Date Period:</div>
          <Select>
            <SelectTrigger className="w-32 h-9 rounded-full [&>svg:last-of-type]:hidden flex items-center pl-2 pr-1">
              <SelectValue placeholder="Monthly" />
              <div className="p-1.5 rounded-full bg-hijaugelap/20">
                <Calendar className="h-4 w-4 text-hijaugelap" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Daily</SelectItem>
              <SelectItem value="2">Weekly</SelectItem>
              <SelectItem value="3">Monthly</SelectItem>
              <SelectItem value="4">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
          <Label
            htmlFor="show-graph"
            className="text-xs font-medium text-gray-600 cursor-pointer select-none"
          >
            Show Graph
          </Label>
          <Switch
            id="show-graph"
            className="data-[state=checked]:bg-hijaugelap [&_span]:bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
