import { TrendingUp, TrendingDown, ShoppingCart, Users, Package, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";

const metrics = [
  { title: "Gesamtumsatz", value: "€48.350", change: "+12,5%", up: true, icon: TrendingUp },
  { title: "Bestellungen heute", value: "127", change: "+8,3%", up: true, icon: ShoppingCart },
  { title: "Aktive Nutzer", value: "3.841", change: "+4,2%", up: true, icon: Users },
  { title: "Top Spielzeug", value: "Holzzug", change: "342 verkauft", up: true, icon: Star },
];

const salesData = [
  { name: "Mo", umsatz: 4200 }, { name: "Di", umsatz: 3800 },
  { name: "Mi", umsatz: 5100 }, { name: "Do", umsatz: 4700 },
  { name: "Fr", umsatz: 6300 }, { name: "Sa", umsatz: 7800 },
  { name: "So", umsatz: 5400 },
];

const ordersData = [
  { name: "Puppen", bestellungen: 85 }, { name: "Autos", bestellungen: 120 },
  { name: "Puzzle", bestellungen: 65 }, { name: "Holz", bestellungen: 95 },
  { name: "Lern", bestellungen: 70 }, { name: "Plüsch", bestellungen: 110 },
];

const recentOrders = [
  { id: "#4821", customer: "Anna M.", total: "€34,99", status: "Versendet" },
  { id: "#4820", customer: "Thomas K.", total: "€89,50", status: "In Bearbeitung" },
  { id: "#4819", customer: "Sarah L.", total: "€19,99", status: "Versendet" },
  { id: "#4818", customer: "Max B.", total: "€54,00", status: "Bezahlt" },
  { id: "#4817", customer: "Julia H.", total: "€127,80", status: "Versendet" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.title} className="bg-admin-card border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-admin-card-foreground/70">{m.title}</span>
                <m.icon className="h-5 w-5 text-admin-cta" />
              </div>
              <p className="text-2xl font-bold text-admin-card-foreground">{m.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {m.up ? (
                  <TrendingUp className="h-3 w-3 text-admin-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={`text-xs font-medium ${m.up ? "text-admin-success" : "text-destructive"}`}>
                  {m.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Umsatz diese Woche</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone" dataKey="umsatz" name="Umsatz €"
                  stroke="hsl(343, 83%, 61%)" strokeWidth={2.5}
                  dot={{ fill: "hsl(343, 83%, 61%)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Bestellungen nach Kategorie</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="bestellungen" name="Bestellungen" fill="hsl(338, 72%, 34%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Letzte Bestellungen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Bestellung</th>
                  <th className="pb-2 font-medium">Kunde</th>
                  <th className="pb-2 font-medium">Betrag</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 font-medium">{o.id}</td>
                    <td className="py-2.5">{o.customer}</td>
                    <td className="py-2.5 font-semibold">{o.total}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        o.status === "Versendet"
                          ? "bg-admin-success/15 text-admin-success"
                          : o.status === "In Bearbeitung"
                          ? "bg-admin-warning/15 text-admin-warning"
                          : "bg-accent/15 text-accent"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
