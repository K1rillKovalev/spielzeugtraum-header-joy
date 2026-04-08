import { TrendingUp, TrendingDown, ShoppingCart, Users, Package, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";

const metrics = [
  { title: "Total Revenue", value: "€48,350", change: "+12.5%", up: true, icon: TrendingUp },
  { title: "Orders Today", value: "127", change: "+8.3%", up: true, icon: ShoppingCart },
  { title: "Active Users", value: "3,841", change: "+4.2%", up: true, icon: Users },
  { title: "Top Toy", value: "Wooden Train", change: "342 sold", up: true, icon: Star },
];

const salesData = [
  { name: "Mon", revenue: 4200 }, { name: "Tue", revenue: 3800 },
  { name: "Wed", revenue: 5100 }, { name: "Thu", revenue: 4700 },
  { name: "Fri", revenue: 6300 }, { name: "Sat", revenue: 7800 },
  { name: "Sun", revenue: 5400 },
];

const ordersData = [
  { name: "Dolls", orders: 85 }, { name: "Cars", orders: 120 },
  { name: "Puzzles", orders: 65 }, { name: "Wooden", orders: 95 },
  { name: "Educational", orders: 70 }, { name: "Plush", orders: 110 },
];

const recentOrders = [
  { id: "#4821", customer: "Anna M.", total: "€34.99", status: "Shipped" },
  { id: "#4820", customer: "Thomas K.", total: "€89.50", status: "Processing" },
  { id: "#4819", customer: "Sarah L.", total: "€19.99", status: "Shipped" },
  { id: "#4818", customer: "Max B.", total: "€54.00", status: "Paid" },
  { id: "#4817", customer: "Julia H.", total: "€127.80", status: "Shipped" },
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
            <CardTitle className="text-base font-display">Revenue This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone" dataKey="revenue" name="Revenue €"
                  stroke="hsl(343, 83%, 61%)" strokeWidth={2.5}
                  dot={{ fill: "hsl(343, 83%, 61%)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Orders by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="orders" name="Orders" fill="hsl(338, 72%, 34%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Amount</th>
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
                        o.status === "Shipped"
                          ? "bg-admin-success/15 text-admin-success"
                          : o.status === "Processing"
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
