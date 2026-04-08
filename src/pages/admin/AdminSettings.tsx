import { useState } from "react";
import { Save, Search, Trash2, Key, Truck, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const logs = [
  { time: "04/08/2026 14:32", level: "info", message: "User admin@spielzeugtraum.de logged in" },
  { time: "04/08/2026 14:28", level: "warning", message: "Low stock: Doll Marie (37 units)" },
  { time: "04/08/2026 13:55", level: "info", message: "Order #4821 shipped" },
  { time: "04/08/2026 13:40", level: "error", message: "PayPal webhook failed – Retry in 5 min" },
  { time: "04/08/2026 12:15", level: "info", message: "CSV export: 245 products exported" },
  { time: "04/08/2026 11:00", level: "info", message: "System backup completed" },
];

export default function AdminSettings() {
  const { toast } = useToast();
  const [modules, setModules] = useState({
    newsletter: true, reviews: true, wishlist: false, loyalty: false,
  });
  const [logSearch, setLogSearch] = useState("");

  const filteredLogs = logs.filter((l) => l.message.toLowerCase().includes(logSearch.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">System Settings</h1>

      <Tabs defaultValue="integrations">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4 mt-4">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-accent" /> Payment Providers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div><Label>PayPal API Key</Label><Input type="password" placeholder="sk_live_..." defaultValue="sk_live_***hidden***" /></div>
                <div><Label>PayPal Secret</Label><Input type="password" placeholder="Secret..." defaultValue="***hidden***" /></div>
                <div><Label>Klarna API Key</Label><Input type="password" placeholder="Klarna Key..." defaultValue="klarna_***hidden***" /></div>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2" onClick={() => toast({ title: "Saved" })}>
                <Save className="h-4 w-4" /> Save
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Truck className="h-5 w-5 text-accent" /> Shipping (DHL)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div><Label>DHL API Key</Label><Input type="password" placeholder="DHL Key..." defaultValue="dhl_***hidden***" /></div>
                <div><Label>Sender Address</Label><Input defaultValue="SpielzeugTraum GmbH, Spielstraße 1, 10115 Berlin" /></div>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2" onClick={() => toast({ title: "Saved" })}>
                <Save className="h-4 w-4" /> Save
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="mt-4">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Enable/Disable Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(modules).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium capitalize">{key === "newsletter" ? "Newsletter" : key === "reviews" ? "Reviews" : key === "wishlist" ? "Wishlist" : "Loyalty Program"}</p>
                      <p className="text-xs text-muted-foreground">
                        {key === "newsletter" ? "Email coupons and updates" : key === "reviews" ? "Product reviews by customers" : key === "wishlist" ? "Wishlist for registered users" : "Earn points with every purchase"}
                      </p>
                    </div>
                    <Switch
                      checked={val}
                      onCheckedChange={(v) => {
                        setModules({ ...modules, [key]: v });
                        toast({ title: v ? "Enabled" : "Disabled" });
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-display">System Logs</CardTitle>
              <Button variant="outline" size="sm" className="gap-1 text-destructive" onClick={() => toast({ title: "Logs cleared" })}>
                <Trash2 className="h-3.5 w-3.5" /> Clear
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 max-w-sm">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-9" value={logSearch} onChange={(e) => setLogSearch(e.target.value)} />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30 text-left">
                      <th className="p-3 font-medium">Time</th>
                      <th className="p-3 font-medium">Level</th>
                      <th className="p-3 font-medium">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((l, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="p-3 text-muted-foreground whitespace-nowrap">{l.time}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            l.level === "error" ? "bg-destructive/15 text-destructive"
                            : l.level === "warning" ? "bg-admin-warning/15 text-admin-warning"
                            : "bg-admin-success/15 text-admin-success"
                          }`}>{l.level}</span>
                        </td>
                        <td className="p-3">{l.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
