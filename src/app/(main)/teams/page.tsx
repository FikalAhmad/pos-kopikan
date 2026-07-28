"use client";

import { useState } from "react";
import { Search, Mail, UserCheck, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllUsersQuery } from "@/redux/features/api/usersApi";
import AddTeam from "./add-team";
import EditTeam from "./edit-team";

export const TeamsPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const { data: usersList } = useGetAllUsersQuery();

  return (
    <div className="flex flex-col gap-4 h-full p-1">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-hijaugelap/10 rounded-full text-hijaugelap">
            <UserCheck size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Total Staff</div>
            <div className="text-2xl font-bold text-gray-800">
              {usersList?.data?.length} Employees
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full text-green-600">
            <UserCheck size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Active On Duty
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {
                usersList?.data?.filter(
                  (user) => user.role.role_name === "CASHIER",
                ).length
              }{" "}
              Staff
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-full text-amber-600">
            <Calendar size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Weekly Shift Rate
            </div>
            <div className="text-2xl font-bold text-gray-800">98.5% Filled</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-600">
            <Award size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Top Performer
            </div>
            <div className="text-2xl font-bold text-gray-800">Fikal Ahmad</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4 flex-1 min-h-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search staff members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 rounded-full text-xs"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {["All", "Admin", "Barista", "Cashier"].map((role) => (
                <Button
                  key={role}
                  variant={roleFilter === role ? "default" : "outline"}
                  onClick={() => setRoleFilter(role)}
                  className={`h-9 px-4 rounded-full text-xs font-medium ${
                    roleFilter === role
                      ? "bg-hijaugelap text-white hover:bg-hijaugelap/90"
                      : "text-gray-600 border-gray-200"
                  }`}
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>

          <AddTeam />
        </div>

        <div className="flex-1 min-h-0 relative">
          <ScrollArea className="h-[calc(100vh-360px)]">
            <Table className="text-left">
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Staff Profile
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Role
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Shift Hours
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">
                    Performance Rating
                  </TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersList?.data?.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-gray-100 shadow-sm flex-shrink-0">
                          <AvatarImage
                            src={`https://media.licdn.com/dms/image/v2/D5603AQGrZsB9kNDHaw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1700052104906?e=2147483647&v=beta&t=JCgNmvkEPCRlheJHyJvxoxPNxwD0yU8VwMF0sXtmieQ`}
                            alt={user.name}
                          />
                          <AvatarFallback className="bg-hijaugelap/10 text-hijaugelap text-xs font-bold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">
                            {user.name}
                          </div>
                          <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                            <Mail size={10} />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-gray-700">
                        {user.role?.role_name}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-gray-500">
                      testing
                    </TableCell>
                    <TableCell>testing</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className="text-sm font-semibold text-gray-700">
                          100%
                        </div>
                        <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="bg-hijaugelap h-full"
                            style={{ width: `100%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <EditTeam user={user} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
