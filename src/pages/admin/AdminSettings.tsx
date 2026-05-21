import { useState } from "react";
import { Save, CreditCard, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const [store, setStore] = useState({
    name: "SpielzeugTraum",
    email: "support@spielzeugtraum.de",
    phone: "+49 30 1234567",
    address: "Spielstraße 1, 10115 Berlin",
    about: "Your trusted online toy shop since 2010.",
  });
  const [payments, setPayments] = useState({
    paypal: true, klarna: true, card: true, sofort: false, applepay: false,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Store Settings</h1>

      <Tabs defaultValue="store">
        <TabsList>
          <TabsTrigger value="store">General</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="mt-4">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Store className="h-5 w-5 text-accent" /> General Store Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div><Label>Store Name</Label><Input value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Contact Email</Label><Input value={store.email} onChange={(e) => setStore({ ...store, email: e.target.value })} /></div>
                <div><Label>Phone</Label><Input value={store.phone} onChange={(e) => setStore({ ...store, phone: e.target.value })} /></div>
              </div>
              <div><Label>Address</Label><Input value={store.address} onChange={(e) => setStore({ ...store, address: e.target.value })} /></div>
              <div><Label>About</Label><Textarea rows={3} value={store.about} onChange={(e) => setStore({ ...store, about: e.target.value })} /></div>
              <Button onClick={() => toast({ title: "Saved" })} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <Save className="h-4 w-4" /> Save
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-accent" /> Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(payments).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium capitalize">{key === "applepay" ? "Apple Pay" : key === "paypal" ? "PayPal" : key}</p>
                    <p className="text-xs text-muted-foreground">
                      {key === "paypal" ? "Pay via PayPal account or guest"
                      : key === "klarna" ? "Buy now, pay later"
                      : key === "card" ? "Credit & debit cards"
                      : key === "sofort" ? "Direct bank transfer (DE/AT)"
                      : "Apple Pay express checkout"}
                    </p>
                  </div>
                  <Switch
                    checked={val}
                    onCheckedChange={(v) => {
                      setPayments({ ...payments, [key]: v });
                      toast({ title: v ? "Enabled" : "Disabled" });
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
