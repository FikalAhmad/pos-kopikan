import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, User, Mail, Lock, ShieldCheck, Phone } from "lucide-react";
import { useCreateUserMutation } from "@/redux/features/api/usersApi";
import { useFetch } from "@/hooks/api/useFetch";

const AddTeam = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role_id: "",
  });

  const [createUser, { isLoading }] = useCreateUserMutation();
  const { data: roleList } = useFetch<{ id: string; role_name: string }[]>(
    ["roles"],
    "/api/roles",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData).unwrap();
      setOpen(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role_id: "",
      });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 rounded-full text-xs bg-hijaugelap text-white hover:bg-hijaugelap/90 flex items-center gap-1.5 w-full sm:w-auto justify-center">
          <Plus size={14} />
          Add Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <User className="h-5 w-5 text-hijaugelap" />
            Add New Team Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-xs font-semibold text-gray-700"
            >
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="pl-9 h-9 text-xs rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-xs font-semibold text-gray-700"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="john@kopikan.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="pl-9 h-9 text-xs rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-xs font-semibold text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="pl-9 h-9 text-xs rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-xs font-semibold text-gray-700"
            >
              Phone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                placeholder="08123456789"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="pl-9 h-9 text-xs rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="role"
              className="text-xs font-semibold text-gray-700"
            >
              Role
            </Label>
            <Select
              value={formData.role_id}
              onValueChange={(value) =>
                setFormData({ ...formData, role_id: value })
              }
            >
              <SelectTrigger className="h-9 text-xs rounded-lg">
                <div className="flex items-center gap-2 text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Select role" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {roleList?.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.role_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-9 text-xs rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-9 text-xs rounded-full bg-hijaugelap text-white hover:bg-hijaugelap/90"
            >
              {isLoading ? "Saving..." : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeam;
