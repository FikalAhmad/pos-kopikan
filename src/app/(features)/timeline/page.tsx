import React from "react";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DriverTimeline = () => {
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 1; hour <= 5; hour++) {
      ["00", "15", "30", "45"].forEach((minute) => {
        slots.push(`${hour}:00 p.m.`);
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <Card className="w-full max-w-6xl">
      <CardContent className="p-0">
        <div className="flex">
          {/* Driver details panel */}
          <div className="w-64 flex-shrink-0 border-r border-gray-200 p-6 bg-gray-50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">John Wayne</h3>
                <span className="text-orange-500 text-sm">32 mins late</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">50%</span>
                  <span className="text-sm text-gray-600">
                    30/234 picked up
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  34 packages scanned/hour
                </div>
              </div>
            </div>
          </div>

          {/* Timeline section */}
          <div className="flex-1 overflow-x-auto">
            <div className="min-w-[1000px] p-6">
              {/* Time slots header */}
              <div className="border-b border-gray-200">
                <div className="grid grid-cols-5">
                  {[1, 2, 3, 4, 5].map((hour) => (
                    <div key={hour} className="relative">
                      <div className="absolute -top-6 left-0 text-sm font-medium text-gray-900">
                        {`0${hour}:00 p.m.`}
                      </div>
                      <div className="grid grid-cols-4">
                        {["00", "15", "30", "45"].map((minute, idx) => (
                          <div
                            key={minute}
                            className={`
                              text-xs text-gray-500 h-8 flex items-center justify-center
                              ${idx < 3 ? "border-r border-gray-200" : ""}
                            `}
                          >
                            {minute}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline grid background */}
              <div className="relative mt-8">
                {/* Timeline rows */}
                <div className="space-y-6 relative">
                  {/* Estimated timeline */}
                  <div className="flex items-center">
                    <div className="w-24 flex-shrink-0 text-sm text-gray-600">
                      Estimated
                    </div>
                    <div className="flex-1 relative h-8">
                      <div className="absolute left-[5%] w-[15%] bg-gray-200 rounded-full h-full flex items-center justify-center">
                        <span className="text-sm">2</span>
                      </div>
                      <div className="absolute h-px w-[20%] bg-gray-300 top-1/2 left-[20%]" />
                      <div className="absolute left-[40%] w-[8%] bg-gray-200 rounded-full h-full flex items-center justify-center">
                        <User className="text-gray-600" size={16} />
                      </div>
                      <div className="absolute h-px w-[17%] bg-gray-300 top-1/2 left-[48%]" />
                      <div className="absolute left-[65%] w-[15%] bg-gray-200 rounded-full h-full flex items-center justify-center">
                        <span className="text-sm">3</span>
                      </div>
                      <div className="absolute h-px w-[20%] bg-gray-300 top-1/2 left-[80%]" />
                    </div>
                  </div>

                  {/* Actual timeline */}
                  <div className="flex items-center">
                    <div className="w-24 flex-shrink-0 text-sm text-gray-600">
                      Actual
                    </div>
                    <div className="flex-1 relative h-8">
                      <div className="absolute left-[8%] w-[20%] bg-green-100 rounded-full h-full flex items-center justify-center">
                        <span className="text-sm">2</span>
                      </div>
                      <div className="absolute h-px w-[7%] bg-gray-300 top-1/2 left-[28%]" />
                      <div className="absolute left-[35%] w-[12%] bg-green-100 rounded-full h-full flex items-center justify-center">
                        <User className="text-gray-600" size={16} />
                      </div>
                      <div className="absolute h-px w-[8%] bg-gray-300 top-1/2 left-[47%]" />
                      <div className="absolute left-[55%] w-[25%] bg-orange-50 rounded-full h-full flex items-center justify-center">
                        <span className="text-sm">3</span>
                      </div>
                    </div>
                  </div>

                  {/* Current time indicator */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-red-500"
                    style={{ left: "82%" }}
                  >
                    <div className="absolute -top-8 -translate-x-1/2 whitespace-nowrap">
                      <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs">
                        04:52 p.m.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverTimeline;
