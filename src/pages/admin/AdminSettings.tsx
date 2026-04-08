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
  { time: "08.04.2026 14:32", level: "info", message: "Benutzer admin@spielzeugtraum.de angemeldet" },
  { time: "08.04.2026 14:28", level: "warning", message: "Lagerbestand niedrig: Puppe Marie (37 Stück)" },
  { time: "08.04.2026 13:55", level: "info", message: "Bestellung #4821 versendet" },
  { time: "08.04.2026 13:40", level: "error", message: "PayPal-Webhook fehlgeschlagen – Retry in 5 min" },
  { time: "08.04.2026 12:15", level: "info", message: "CSV-Export: 245 Produkte exportiert" },
  { time: "08.04.2026 11:00", level: "info", message: "System-Backup abgeschlossen" },
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
      <h1 className="text-2xl font-display font-bold">Systemeinstellungen</h1>

      <Tabs defaultValue="integrations">
        <TabsList>
          <TabsTrigger value="integrations">Integrationen</TabsTrigger>
          <TabsTrigger value="modules">Module</TabsTrigger>
          <TabsTrigger value="logs">System-Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4 mt-4">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-accent" /> Zahlungsanbieter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div><Label>PayPal API Key</Label><Input type="password" placeholder="sk_live_..." defaultValue="sk_live_***hidden***" /></div>
                <div><Label>PayPal Secret</Label><Input type="password" placeholder="Secret..." defaultValue="***hidden***" /></div>
                <div><Label>Klarna API Key</Label><Input type="password" placeholder="Klarna Key..." defaultValue="klarna_***hidden***" /></div>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2" onClick={() => toast({ title: "Gespeichert" })}>
                <Save className="h-4 w-4" /> Speichern
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Truck className="h-5 w-5 text-accent" /> Versand (DHL)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div><Label>DHL API Key</Label><Input type="password" placeholder="DHL Key..." defaultValue="dhl_***hidden***" /></div>
                <div><Label>Absender-Adresse</Label><Input defaultValue="SpielzeugTraum GmbH, Spielstraße 1, 10115 Berlin" /></div>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2" onClick={() => toast({ title: "Gespeichert" })}>
                <Save className="h-4 w-4" /> Speichern
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="mt-4">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Module aktivieren/deaktivieren</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(modules).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium capitalize">{key === "newsletter" ? "Newsletter" : key === "reviews" ? "Bewertungen" : key === "wishlist" ? "Wunschliste" : "Treueprogramm"}</p>
                      <p className="text-xs text-muted-foreground">
                        {key === "newsletter" ? "E-Mail-Gutscheine und Updates" : key === "reviews" ? "Produktbewertungen durch Kunden" : key === "wishlist" ? "Wunschliste für registrierte Nutzer" : "Punkte sammeln bei jedem Einkauf"}
                      </p>
                    </div>
                    <Switch
                      checked={val}
                      onCheckedChange={(v) => {
                        setModules({ ...modules, [key]: v });
                        toast({ title: v ? "Aktiviert" : "Deaktiviert" });
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
              <CardTitle className="text-base font-display">System-Logs</CardTitle>
              <Button variant="outline" size="sm" className="gap-1 text-destructive" onClick={() => toast({ title: "Logs gelöscht" })}>
                <Trash2 className="h-3.5 w-3.5" /> Löschen
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 max-w-sm">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Logs durchsuchen..." className="pl-9" value={logSearch} onChange={(e) => setLogSearch(e.target.value)} />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30 text-left">
                      <th className="p-3 font-medium">Zeit</th>
                      <th className="p-3 font-medium">Level</th>
                      <th className="p-3 font-medium">Nachricht</th>
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
