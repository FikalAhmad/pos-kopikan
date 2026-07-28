"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  PowerIcon,
  DollarSign,
  AlertTriangle,
  Lock,
  Unlock,
} from "lucide-react";
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

const OrderToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shiftStatus, setShiftStatus] = useState<"OPEN" | "CLOSED">("CLOSED");

  // Open Shift state
  const [startingCashInput, setStartingCashInput] = useState<string>("");

  // Close Shift state
  const [actualCashInput, setActualCashInput] = useState<string>("");
  const [notesInput, setNotesInput] = useState<string>("");
  const [step, setStep] = useState<"INPUT_ACTUAL" | "REVIEW_DISCREPANCY">(
    "INPUT_ACTUAL",
  );
  const [calculatedExpected, setCalculatedExpected] = useState<number>(0);
  const [currentStartingCash, setCurrentStartingCash] = useState<number>(0);

  const handleOpenShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startingCash = parseFloat(startingCashInput) || 0;
    setCurrentStartingCash(startingCash);
    setShiftStatus("OPEN");
    setIsOpen(false);
    setStartingCashInput("");
  };

  const handleCloseShiftRequest = (e: React.FormEvent) => {
    e.preventDefault();

    const actual = parseFloat(actualCashInput) || 0;
    if (actual !== expected) {
      setStep("REVIEW_DISCREPANCY");
    } else {
      finalizeCloseShift(actual, expected, "");
    }
  };

  const finalizeCloseShift = (
    actual: number,
    expected: number,
    notes: string,
  ) => {
    const discrepancy = actual - expected;
    setShiftStatus("CLOSED");
    setIsOpen(false);
    setActualCashInput("");
    setNotesInput("");
    setStep("INPUT_ACTUAL");
  };

  const handleDiscrepancySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const actual = parseFloat(actualCashInput) || 0;
    finalizeCloseShift(actual, calculatedExpected, notesInput);
  };

  const actualCashNum = parseFloat(actualCashInput) || 0;
  const discrepancy = actualCashNum - calculatedExpected;

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-12 p-1 pl-4 pr-1 flex items-center gap-3 shadow-sm justify-center bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer border-none shrink-0"
      >
        <div
          className={`flex items-center gap-2 text-md font-medium justify-center ${
            shiftStatus === "OPEN" ? "text-hijaugelap" : "text-red-600"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              shiftStatus === "OPEN" ? "bg-hijaugelap" : "bg-red-600"
            }`}
          />
          {shiftStatus === "OPEN" ? "Open Order" : "Close Order"}
        </div>
        <div
          className={`p-1.5 rounded-full ${
            shiftStatus === "OPEN"
              ? "bg-hijaugelap/20 text-hijaugelap"
              : "bg-red-600/20 text-red-600"
          }`}
        >
          <PowerIcon className="w-5 h-5" />
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          {shiftStatus === "CLOSED" ? (
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
                      value={startingCashInput}
                      onChange={(e) => setStartingCashInput(e.target.value)}
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
                  Buka Shift (OPEN)
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <>
              {step === "INPUT_ACTUAL" ? (
                <form onSubmit={handleCloseShiftRequest}>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                      <Lock className="w-5 h-5" />
                      Tutup Shift Kasir
                    </DialogTitle>
                    <DialogDescription>
                      Hitung fisik uang tunai di laci dan masukkan hasil
                      perhitungan aktual.
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
                          value={actualCashInput}
                          onChange={(e) => setActualCashInput(e.target.value)}
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
                    <Button type="submit" variant="destructive">
                      Lanjut & Hitung Expected
                    </Button>
                  </DialogFooter>
                </form>
              ) : (
                <form onSubmit={handleDiscrepancySubmit}>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-amber-600">
                      <AlertTriangle className="w-5 h-5" />
                      Terdapat Selisih Kas!
                    </DialogTitle>
                    <DialogDescription>
                      Hasil hitung fisik tidak cocok dengan data perhitungan
                      sistem.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-3 space-y-4">
                    <div className="bg-slate-50 p-3 rounded-lg border text-sm space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kas Awal:</span>
                        <span className="font-medium">
                          Rp {currentStartingCash.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Expected Cash (Sistem):
                        </span>
                        <span className="font-semibold text-gray-800">
                          Rp {calculatedExpected.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Actual Cash (Fisik):
                        </span>
                        <span className="font-semibold text-gray-800">
                          Rp {actualCashNum.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-1 border-t flex justify-between font-bold">
                        <span>Selisih (Discrepancy):</span>
                        <span
                          className={
                            discrepancy < 0 ? "text-red-600" : "text-amber-600"
                          }
                        >
                          {discrepancy > 0 ? "+" : ""}Rp{" "}
                          {discrepancy.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="notes"
                        className="text-red-600 font-semibold"
                      >
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
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("INPUT_ACTUAL")}
                    >
                      Kembali
                    </Button>
                    <Button type="submit" variant="destructive">
                      Simpan Shift (CLOSED)
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderToggle;
