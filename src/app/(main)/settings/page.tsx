"use client";

import { useState } from "react";
import { Store, Printer, CreditCard, Save, RefreshCw, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("Kopikan POS - Sudirman");
  const [storeTax, setStoreTax] = useState("10");
  const [storeServiceCharge, setStoreServiceCharge] = useState("5");
  const [autoPrint, setAutoPrint] = useState(true);
  const [enableQris, setEnableQris] = useState(true);
  const [enableGopay, setEnableGopay] = useState(true);
  const [enableOvo, setEnableOvo] = useState(true);
  const [enableCash, setEnableCash] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-4 h-full p-1 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500 font-medium">Configure store settings, hardware integration, and preferences.</h2>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-hijaugelap text-white hover:bg-hijaugelap/90 rounded-full h-10 px-6 text-xs font-semibold flex items-center gap-1.5"
        >
          {isSaving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save size={14} />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full flex flex-col md:flex-row gap-6">
        <TabsList className="flex md:flex-col bg-transparent gap-1 p-0 h-auto md:w-48 shrink-0 justify-start items-stretch">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-hijaugelap/10 data-[state=active]:text-hijaugelap text-gray-600 font-semibold px-4 py-2.5 rounded-lg justify-start gap-2.5 text-xs shadow-none border-none text-left"
          >
            <Store size={16} />
            General Store
          </TabsTrigger>
          <TabsTrigger
            value="receipt"
            className="data-[state=active]:bg-hijaugelap/10 data-[state=active]:text-hijaugelap text-gray-600 font-semibold px-4 py-2.5 rounded-lg justify-start gap-2.5 text-xs shadow-none border-none text-left"
          >
            <Printer size={16} />
            Hardware & Printer
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="data-[state=active]:bg-hijaugelap/10 data-[state=active]:text-hijaugelap text-gray-600 font-semibold px-4 py-2.5 rounded-lg justify-start gap-2.5 text-xs shadow-none border-none text-left"
          >
            <CreditCard size={16} />
            Payment Methods
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-hijaugelap/10 data-[state=active]:text-hijaugelap text-gray-600 font-semibold px-4 py-2.5 rounded-lg justify-start gap-2.5 text-xs shadow-none border-none text-left"
          >
            <KeyRound size={16} />
            Security & Roles
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          {/* General Settings */}
          <TabsContent value="general" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Store Profile</CardTitle>
                <CardDescription className="text-xs text-gray-400">Manage basic outlets and financial tax rate configurations.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="store-name" className="text-xs font-semibold text-gray-700">Store Outlet Name</Label>
                  <Input
                    id="store-name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="h-10 rounded-lg text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="store-tax" className="text-xs font-semibold text-gray-700">Tax Rate (%)</Label>
                    <Input
                      id="store-tax"
                      type="number"
                      value={storeTax}
                      onChange={(e) => setStoreTax(e.target.value)}
                      className="h-10 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="store-service" className="text-xs font-semibold text-gray-700">Service Charge (%)</Label>
                    <Input
                      id="store-service"
                      type="number"
                      value={storeServiceCharge}
                      onChange={(e) => setStoreServiceCharge(e.target.value)}
                      className="h-10 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <Label className="text-xs font-semibold text-gray-700">Operating Currency</Label>
                  <Input disabled value="IDR (Rp) - Indonesian Rupiah" className="h-10 rounded-lg text-xs bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hardware & Printer Settings */}
          <TabsContent value="receipt" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Hardware & Thermal Printer</CardTitle>
                <CardDescription className="text-xs text-gray-400">Configure connected LAN/Bluetooth thermal printers.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex flex-col gap-0.5">
                    <Label className="text-sm font-semibold text-gray-700">Auto-Print Receipt</Label>
                    <span className="text-[10px] text-gray-400">Automatically print receipt after payment transaction completes.</span>
                  </div>
                  <Switch checked={autoPrint} onCheckedChange={setAutoPrint} className="data-[state=checked]:bg-hijaugelap" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold text-gray-700">Receipt Printer Connection</Label>
                  <div className="flex gap-2">
                    <Input value="192.168.1.100 (Thermal Printer 80mm)" readOnly className="h-10 rounded-lg text-xs bg-gray-50 flex-1" />
                    <Button variant="outline" className="h-10 rounded-lg text-xs border-gray-200 text-gray-700">Test Print</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mt-2">
                  <div className="flex flex-col gap-0.5">
                    <Label className="text-sm font-semibold text-gray-700">Kitchen Ticket Routing</Label>
                    <span className="text-[10px] text-gray-400">Print order item copies to kitchen department printers.</span>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-hijaugelap" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Settings */}
          <TabsContent value="payment" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">POS Payment Gateways</CardTitle>
                <CardDescription className="text-xs text-gray-400">Toggle accepted cashier payment gateways.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-gray-800">Cash Payment</span>
                  </div>
                  <Switch checked={enableCash} onCheckedChange={setEnableCash} className="data-[state=checked]:bg-hijaugelap" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-gray-800">QRIS (Dynamic & Static)</span>
                  </div>
                  <Switch checked={enableQris} onCheckedChange={setEnableQris} className="data-[state=checked]:bg-hijaugelap" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-gray-800">GoPay E-Wallet</span>
                  </div>
                  <Switch checked={enableGopay} onCheckedChange={setEnableGopay} className="data-[state=checked]:bg-hijaugelap" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-gray-800">OVO E-Wallet</span>
                  </div>
                  <Switch checked={enableOvo} onCheckedChange={setEnableOvo} className="data-[state=checked]:bg-hijaugelap" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security & Roles Settings */}
          <TabsContent value="security" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Access Security</CardTitle>
                <CardDescription className="text-xs text-gray-400">Customize cashier access level restrictions.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex flex-col gap-0.5">
                    <Label className="text-sm font-semibold text-gray-700">Require PIN for Cash Drawer</Label>
                    <span className="text-[10px] text-gray-400">Require employee pin entry to manually pop open cash drawers.</span>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-hijaugelap" />
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex flex-col gap-0.5">
                    <Label className="text-sm font-semibold text-gray-700">Manager Overrides on Void</Label>
                    <span className="text-[10px] text-gray-400">Require supervisor approval PIN to void order tickets or items.</span>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-hijaugelap" />
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex flex-col gap-0.5">
                    <Label className="text-sm font-semibold text-gray-700">Daily Sales Email Reports</Label>
                    <span className="text-[10px] text-gray-400">Email daily end-of-shift sales reports automatically to outlet owner.</span>
                  </div>
                  <Switch defaultChecked={false} className="data-[state=checked]:bg-hijaugelap" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
