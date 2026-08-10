"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { PowerIcon, DollarSign, Lock, Unlock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  useCloseShiftMutation,
  useOpenShiftMutation,
} from "@/redux/features/api/shiftsApi";
import { useAppSelector } from "@/redux/store";
import { toast } from "sonner";

const OrderToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { shift_id, status } = useAppSelector((state) => state.shift);

  const [openShift, { isLoading }] = useOpenShiftMutation();
  const [closeShift] = useCloseShiftMutation();

  // Open Shift state
  const [startingCash, setStartingCash] = useState<string>("");

  // Close Shift state
  const [actualCash, setActualCash] = useState<string>("");
  const [notesInput, setNotesInput] = useState<string>("");

  const handleOpenShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        openShift({
          cashier_id: user?.id,
          starting_cash: parseFloat(startingCash),
        });
      }
      setIsOpen(false);
      setStartingCash("");
      toast.success("Shift OPEN!");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleCloseShiftRequest = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      closeShift({
        shift_id: shift_id,
        actual_cash: parseFloat(actualCash),
        notes: notesInput,
      });
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-12 p-1 pl-4 pr-1 flex items-center gap-3 shadow-sm justify-center bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer border-none shrink-0"
      >
        <div
          className={`flex items-center gap-2 text-md font-medium justify-center ${
            status === "OPEN" ? "text-hijaugelap" : "text-red-600"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              status === "OPEN" ? "bg-hijaugelap" : "bg-red-600"
            }`}
          />
          {status === "OPEN" ? "Open Order" : "Close Order"}
        </div>
        <div
          className={`p-1.5 rounded-full ${
            status === "OPEN"
              ? "bg-hijaugelap/20 text-hijaugelap"
              : "bg-red-600/20 text-red-600"
          }`}
        >
          <PowerIcon className="w-5 h-5" />
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          {status === "CLOSED" ? (
            <form onSubmit={handleOpenShiftSubmit}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-hijaugelap">
                  <Unlock className="w-5 h-5" />
                  Buka Shift Kasir
                </DialogTitle>
                <DialogDescription>
                  Masukkan jumlah kas awal (modal tunai) yang ada di laci
                  sebelum membuka kasir.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="starting_cash">Kas Awal di Laci (Rp)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="starting_cash"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={startingCash}
                      onChange={(e) => setStartingCash(e.target.value)}
                      className="pl-9"
                      required
                      autoFocus
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-hijaugelap hover:bg-hijaugelap/90 text-white"
                >
                  {isLoading ? "Loading ..." : "Buka Shift (OPEN)"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <form onSubmit={handleCloseShiftRequest}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                  <Lock className="w-5 h-5" />
                  Tutup Shift Kasir
                </DialogTitle>
                <DialogDescription>
                  Hitung fisik uang tunai di laci dan masukkan hasil perhitungan
                  aktual.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="actual_cash">
                    Hasil Hitung Fisik Uang di Laci (Rp)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="actual_cash"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={actualCash}
                      onChange={(e) => setActualCash(e.target.value)}
                      className="pl-9"
                      required
                      autoFocus
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-red-600 font-semibold">
                  Catatan Alasan Selisih *
                </Label>
                <Input
                  id="notes"
                  type="text"
                  placeholder="Contoh: Kembalian kurang / Uang robek / Salah hitung"
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" variant="destructive">
                  Simpan Shift (CLOSED)
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderToggle;
