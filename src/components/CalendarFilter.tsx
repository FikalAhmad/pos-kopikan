"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

type SingleModeProps = {
  children: React.ReactNode;
  selected: Date | undefined;
  onSelect: Dispatch<SetStateAction<Date>>;
  mode?: "single";
};
type RangeModeProps = {
  children: React.ReactNode;
  selected: DateRange | undefined;
  onSelect: Dispatch<SetStateAction<DateRange | undefined>>;
  mode: "range";
};

type Props = SingleModeProps | RangeModeProps;

const CalendarFilter = (props: Props) => {
  const { children } = props;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-12 rounded-full justify-between gap-3 pl-4 pr-1 border-gray-200 bg-white text-black shadow-sm transition-all hover:bg-gray-50"
        >
          {children}

          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-hijaugelap/20 text-hijaugelap">
            <CalendarIcon className="h-4 w-4 stroke-[2.5]" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-xl" align="end">
        {props.mode === "range" ? (
          <Calendar
            mode="range"
            selected={props.selected}
            onSelect={props.onSelect}
            required
          />
        ) : (
          <Calendar
            mode="single"
            selected={props.selected}
            onSelect={props.onSelect}
            required
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CalendarFilter;
