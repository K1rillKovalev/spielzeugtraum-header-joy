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
  { month: "Jan", umsatz: 32000 }, { month: "Feb", umsatz: 28000 },
  { month: "Mär", umsatz: 35000 }, { month: "Apr", umsatz: 42000 },
  { month: "Mai", umsatz: 38000 }, { month: "Jun", umsatz: 45000 },
  { month: "Jul", umsatz: 50000 }, { month: "Aug", umsatz: 48000 },
  { month: "Sep", umsatz: 52000 }, { month: "Okt", umsatz: 58000 },
  { month: "Nov", umsatz: 62000 }, { month: "Dez", umsatz: 75000 },
];

const categories = [
  { name: "Holzspielzeug", value: 30, color: "hsl(338, 72%, 34%)" },
  { name: "Plüschtiere", value: 25, color: "hsl(343, 83%, 61%)" },
  { name: "Puzzle", value: 15, color: "hsl(349, 52%, 79%)" },
  { name: "Autos", value: 18, color: "hsl(340, 100%, 18%)" },
  { name: "Lernspielzeug", value: 12, color: "hsl(45, 93%, 58%)" },
];

const activity = [
  { day: "Mo", besucher: 1200, bestellungen: 85 },
  { day: "Di", besucher: 980, bestellungen: 72 },
  { day: "Mi", besucher: 1400, bestellungen: 110 },
  { day: "Do", besucher: 1100, bestellungen: 88 },
  { day: "Fr", besucher: 1600, bestellungen: 130 },
  { day: "Sa", besucher: 1900, bestellungen: 165 },
  { day: "So", besucher: 1300, bestellungen: 95 },
];

export default function AdminStats() {
  const [dateRange, setDateRange] = useState("year");
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-display font-bold">Statistiken</h1>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Diese Woche</SelectItem>
              <SelectItem value="month">Dieser Monat</SelectItem>
              <SelectItem value="year">Dieses Jahr</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={() => toast({ title: "Export", description: "Bericht wird erstellt..." })}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Sales Trend */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Umsatzentwicklung 2026</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`€${v.toLocaleString("de-DE")}`, "Umsatz"]} />
              <Line type="monotone" dataKey="umsatz" stroke="hsl(343, 83%, 61%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(343, 83%, 61%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Umsatz nach Kategorie</CardTitle>
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
            <CardTitle className="text-base font-display">Wöchentliche Aktivität</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={activity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="besucher" name="Besucher" fill="hsl(338, 72%, 34%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bestellungen" name="Bestellungen" fill="hsl(343, 83%, 61%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
