import { useState } from "react";
import { Download } from "lucide-react";
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

// Daily sales (last 7 days)
const dailySales = [
  { day: "Mon", revenue: 1240 },
  { day: "Tue", revenue: 980 },
  { day: "Wed", revenue: 1530 },
  { day: "Thu", revenue: 1820 },
  { day: "Fri", revenue: 2150 },
  { day: "Sat", revenue: 2780 },
  { day: "Sun", revenue: 1670 },
];

// Activity vs orders
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
    </div>
  );
}
