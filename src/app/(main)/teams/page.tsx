"use client";

import { useState } from "react";
import { Search, Plus, Mail, ShieldCheck, UserCheck, Coffee, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Cashier" | "Barista";
  shift: string;
  status: "On Duty" | "On Break" | "Offline";
  avatar: string;
  performanceScore: number;
}

const mockTeam: TeamMember[] = [
  {
    id: "EMP001",
    name: "Fikal Ahmad",
    email: "fikal@kopikan.com",
    role: "Admin",
    shift: "Morning Shift (07:00 - 15:00)",
    status: "On Duty",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    performanceScore: 98,
  },
  {
    id: "EMP002",
    name: "Aditya Pratama",
    email: "aditya@kopikan.com",
    role: "Barista",
    shift: "Morning Shift (07:00 - 15:00)",
    status: "On Duty",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    performanceScore: 92,
  },
  {
    id: "EMP003",
    name: "Sarah Wijaya",
    email: "sarah@kopikan.com",
    role: "Cashier",
    shift: "Evening Shift (15:00 - 23:00)",
    status: "On Break",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    performanceScore: 95,
  },
  {
    id: "EMP004",
    name: "Budi Santoso",
    email: "budi@kopikan.com",
    role: "Barista",
    shift: "Evening Shift (15:00 - 23:00)",
    status: "Offline",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    performanceScore: 89,
  },
  {
    id: "EMP005",
    name: "Dewi Lestari",
    email: "dewi@kopikan.com",
    role: "Cashier",
    shift: "Morning Shift (07:00 - 15:00)",
    status: "Offline",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    performanceScore: 91,
  },
];

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredTeam = mockTeam.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase()) || member.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (status: TeamMember["status"]) => {
    switch (status) {
      case "On Duty":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-medium rounded-full px-3 py-1">On Duty</Badge>;
      case "On Break":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-medium rounded-full px-3 py-1">On Break</Badge>;
      case "Offline":
        return <Badge className="bg-gray-100 text-gray-400 hover:bg-gray-100 border-none font-medium rounded-full px-3 py-1">Offline</Badge>;
    }
  };

  const getRoleIcon = (role: TeamMember["role"]) => {
    switch (role) {
      case "Admin":
        return <ShieldCheck className="h-4 w-4 text-hijaugelap shrink-0" />;
      case "Barista":
        return <Coffee className="h-4 w-4 text-amber-600 shrink-0" />;
      case "Cashier":
        return <UserCheck className="h-4 w-4 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full p-1">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-hijaugelap/10 rounded-full text-hijaugelap">
            <UserCheck size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Total Staff</div>
            <div className="text-2xl font-bold text-gray-800">18 Employees</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full text-green-600">
            <UserCheck size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Active On Duty</div>
            <div className="text-2xl font-bold text-gray-800">5 Staff</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-full text-amber-600">
            <Calendar size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Weekly Shift Rate</div>
            <div className="text-2xl font-bold text-gray-800">98.5% Filled</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-600">
            <Award size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Top Performer</div>
            <div className="text-2xl font-bold text-gray-800">Fikal Ahmad</div>
          </div>
        </div>
      </div>

      {/* Main Staff Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4 flex-1 min-h-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {/* Filters & Search */}
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

          <Button className="h-9 rounded-full text-xs bg-hijaugelap text-white hover:bg-hijaugelap/90 flex items-center gap-1.5 w-full sm:w-auto justify-center">
            <Plus size={14} />
            Invite Member
          </Button>
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 min-h-0 relative">
          <ScrollArea className="h-[calc(100vh-360px)]">
            <Table className="text-left">
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="text-gray-500 font-bold text-xs">Staff Profile</TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">Role</TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">Shift Hours</TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">Status</TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs">Performance Rating</TableHead>
                  <TableHead className="text-gray-500 font-bold text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeam.map((member) => (
                  <TableRow key={member.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-gray-100 shadow-sm flex-shrink-0">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-hijaugelap/10 text-hijaugelap text-xs font-bold">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">{member.name}</div>
                          <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                            <Mail size={10} />
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-gray-700">
                        {getRoleIcon(member.role)}
                        {member.role}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-gray-500">{member.shift}</TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className="text-sm font-semibold text-gray-700">{member.performanceScore}%</div>
                        <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="bg-hijaugelap h-full" style={{ width: `${member.performanceScore}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold rounded-full text-gray-600 hover:bg-gray-100">
                          Schedule
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold rounded-full text-hijaugelap hover:bg-hijaugelap/10">
                          Edit
                        </Button>
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
}
