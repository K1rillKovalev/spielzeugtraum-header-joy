import { useState } from "react";
import { Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

const salesTrend = [
  { month: "Jan", revenue: 32000 }, { month: "Feb", revenue: 28000 },
  { month: "Mar", revenue: 35000 }, { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 38000 }, { month: "Jun", revenue: 45000 },
  { month: "Jul", revenue: 50000 }, { month: "Aug", revenue: 48000 },
  { month: "Sep", revenue: 52000 }, { month: "Oct", revenue: 58000 },
  { month: "Nov", revenue: 62000 }, { month: "Dec", revenue: 75000 },
];

const categories = [
  { name: "Wooden Toys", value: 30, color: "hsl(338, 72%, 34%)" },
  { name: "Plush Toys", value: 25, color: "hsl(343, 83%, 61%)" },
  { name: "Puzzles", value: 15, color: "hsl(349, 52%, 79%)" },
  { name: "Cars", value: 18, color: "hsl(340, 100%, 18%)" },
  { name: "Educational", value: 12, color: "hsl(45, 93%, 58%)" },
];

const activity = [
  { day: "Mon", visitors: 1200, orders: 85 },
  { day: "Tue", visitors: 980, orders: 72 },
  { day: "Wed", visitors: 1400, orders: 110 },
  { day: "Thu", visitors: 1100, orders: 88 },
  { day: "Fri", visitors: 1600, orders: 130 },
  { day: "Sat", visitors: 1900, orders: 165 },
  { day: "Sun", visitors: 1300, orders: 95 },
];

export default function AdminStats() {
  const [dateRange, setDateRange] = useState("year");
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-display font-bold">Statistics</h1>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={() => toast({ title: "Export", description: "Report is being generated..." })}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Sales Trend */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Revenue Trend 2026</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`€${v.toLocaleString("en-US")}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(343, 83%, 61%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(343, 83%, 61%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categories.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={activity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="visitors" name="Visitors" fill="hsl(338, 72%, 34%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" name="Orders" fill="hsl(343, 83%, 61%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
