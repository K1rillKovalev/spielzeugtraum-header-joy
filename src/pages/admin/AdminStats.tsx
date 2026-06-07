import { useState } from "react";
import { Download, TrendingUp, TrendingDown, ShoppingCart, Users, Star } from "lucide-react";
import * as XLSX from "xlsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

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

const dailySales = [
  { day: "Mon", revenue: 1240 },
  { day: "Tue", revenue: 980 },
  { day: "Wed", revenue: 1530 },
  { day: "Thu", revenue: 1820 },
  { day: "Fri", revenue: 2150 },
  { day: "Sat", revenue: 2780 },
  { day: "Sun", revenue: 1670 },
];

const activity = [
  { day: "Mon", logins: 142, orders: 32 },
  { day: "Tue", logins: 118, orders: 28 },
  { day: "Wed", logins: 165, orders: 41 },
  { day: "Thu", logins: 187, orders: 47 },
  { day: "Fri", logins: 220, orders: 58 },
  { day: "Sat", logins: 268, orders: 71 },
  { day: "Sun", logins: 195, orders: 43 },
];

const datasets: Record<string, { label: string; date: string; revenue: number; orders: number }[]> = {
  week: dailySales.map((d, i) => ({ label: d.day, date: `2026-05-${12 + i}`, revenue: d.revenue, orders: activity[i].orders })),
  month: Array.from({ length: 4 }, (_, i) => ({
    label: `Week ${i + 1}`, date: `2026-05`, revenue: 8000 + i * 1500, orders: 180 + i * 40,
  })),
  quarter: Array.from({ length: 3 }, (_, i) => ({
    label: ["Mar", "Apr", "May"][i], date: `2026-0${i + 3}`, revenue: 38000 + i * 4200, orders: 720 + i * 90,
  })),
};

export default function AdminStats() {
  const [period, setPeriod] = useState<"week" | "month" | "quarter">("week");
  const { toast } = useToast();

  const exportXlsx = () => {
    const rows = datasets[period].map((r) => ({
      Period: r.label, Date: r.date, "Revenue (€)": r.revenue, Orders: r.orders,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Sales ${period}`);
    XLSX.writeFile(wb, `sales-${period}.xlsx`);
    toast({ title: "Exported", description: `sales-${period}.xlsx` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h1 className="text-2xl font-display font-bold">Statistics</h1>
        <div className="flex gap-2">
          <Select value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportXlsx} className="gap-2">
            <Download className="h-4 w-4" /> Export XLSX
          </Button>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2"><CardTitle className="text-base font-display">Revenue This Week</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" name="Revenue €" stroke="hsl(343, 83%, 61%)" strokeWidth={2.5} dot={{ fill: "hsl(343, 83%, 61%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2"><CardTitle className="text-base font-display">Orders by Category</CardTitle></CardHeader>
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

      <Card className="border-none shadow-md">
        <CardHeader className="pb-2"><CardTitle className="text-base font-display">Daily Sales</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" name="Revenue €" stroke="hsl(343, 83%, 61%)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader className="pb-2"><CardTitle className="text-base font-display">Activity vs Orders</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={activity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="logins" name="Logins" fill="hsl(338, 72%, 34%)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="orders" name="Orders" fill="hsl(343, 83%, 61%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader className="pb-2"><CardTitle className="text-base font-display">Recent Orders</CardTitle></CardHeader>
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
