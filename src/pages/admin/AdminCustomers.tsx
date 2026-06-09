import { useState, useMemo } from "react";
import { Search, ArrowUpDown, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface C {
  id: number; name: string; email: string; phone: string;
  registered: string; totalSpent: number; lastPurchase: string; orders: number;
}

const customers: C[] = [
  { id: 1, name: "Anna Müller", email: "anna@example.com", phone: "+49 170 1234567", registered: "2024-03-12", totalSpent: 845.50, lastPurchase: "2026-05-18", orders: 7 },
  { id: 2, name: "Thomas Klein", email: "thomas@example.com", phone: "+49 171 2345678", registered: "2024-09-04", totalSpent: 412.20, lastPurchase: "2026-04-30", orders: 4 },
  { id: 3, name: "–", email: "sarah@example.com", phone: "+49 152 3456789", registered: "2025-01-20", totalSpent: 1234.99, lastPurchase: "2026-05-15", orders: 11 },
  { id: 4, name: "Max Bauer", email: "max@example.com", phone: "–", registered: "2023-11-08", totalSpent: 2189.00, lastPurchase: "2026-05-20", orders: 18 },
  { id: 5, name: "Julia Hoffmann", email: "julia@example.com", phone: "+49 175 5678901", registered: "2025-06-15", totalSpent: 327.80, lastPurchase: "2026-03-22", orders: 3 },
];

type SortMetric = "recency" | "frequency" | "money";
type SortDir = "asc" | "desc";
type Sort = { metric: SortMetric; dir: SortDir } | null;

const TODAY = new Date("2026-06-09");
const daysSince = (d: string) => Math.floor((TODAY.getTime() - new Date(d).getTime()) / 86400000);

const STAT = "#5D001E";

export default function AdminCustomers() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>(null);
  const [selected, setSelected] = useState<C | null>(null);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    let list = customers.filter((c) =>
      c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s) || c.phone.includes(s)
    );
    if (sort) {
      const val = (c: C) => sort.metric === "recency" ? daysSince(c.lastPurchase) : sort.metric === "frequency" ? c.orders : c.totalSpent;
      list = [...list].sort((a, b) => sort.dir === "asc" ? val(a) - val(b) : val(b) - val(a));
    }
    return list;
  }, [q, sort]);

  const sortLabel: Record<SortMetric, string> = {
    recency: "Recency",
    frequency: "Frequency",
    money: "Money spent",
  };

  const sortCell = (c: C) => {
    if (!sort) return "";
    if (sort.metric === "recency") return `${daysSince(c.lastPurchase)} days`;
    if (sort.metric === "frequency") return `${c.orders} orders`;
    return `€${c.totalSpent.toFixed(2)}`;
  };

  const exportXlsx = () => {
    const rows = customers.map((c) => ({
      Email: c.email,
      Name: c.name,
      Phone: c.phone,
      Registered: c.registered,
      "Recency (days)": daysSince(c.lastPurchase),
      "Frequency (orders)": c.orders,
      "Money spent (€)": c.totalSpent,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, "customers.xlsx");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Customers</h1>
      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative max-w-md flex-1 min-w-[220px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name / email / phone..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ArrowUpDown className="h-4 w-4" />
              {sort ? `Sort: ${sortLabel[sort.metric]} ${sort.dir === "asc" ? "↑" : "↓"}` : "Sort by..."}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ascending</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSort({ metric: "recency", dir: "asc" })}>Recency ↑</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort({ metric: "frequency", dir: "asc" })}>Frequency ↑</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort({ metric: "money", dir: "asc" })}>Money spent ↑</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Descending</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSort({ metric: "recency", dir: "desc" })}>Recency ↓</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort({ metric: "frequency", dir: "desc" })}>Frequency ↓</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort({ metric: "money", dir: "desc" })}>Money spent ↓</DropdownMenuItem>
            {sort && <><DropdownMenuSeparator /><DropdownMenuItem onClick={() => setSort(null)}>Clear sort</DropdownMenuItem></>}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="gap-2" onClick={exportXlsx}>
          <Download className="h-4 w-4" /> Export XLSX
        </Button>
      </div>
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="p-3 font-medium">Email</th>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Phone</th>
                  <th className="p-3 font-medium">Registered</th>
                  {sort && (
                    <th
                      className="p-3 font-bold border-l-2"
                      style={{ background: "#5D001E", color: "#fff", borderColor: "#5D001E" }}
                    >
                      {sortLabel[sort.metric]} {sort.dir === "asc" ? "↑" : "↓"}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b last:border-0 hover:bg-muted/20 cursor-pointer"
                    onClick={() => setSelected(c)}
                  >
                    <td className="p-3 text-muted-foreground">{c.email}</td>
                    <td className="p-3 font-medium">{c.name}</td>
                    <td className="p-3 text-muted-foreground">{c.phone}</td>
                    <td className="p-3">{c.registered}</td>
                    {sort && (
                      <td
                        className="p-3 font-semibold border-l-2"
                        style={{ background: "rgba(93,0,30,0.08)", color: STAT, borderColor: "#5D001E" }}
                      >
                        {sortCell(c)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 pt-2">
              <div className="text-sm text-muted-foreground">{selected.email} · {selected.phone}</div>
              <div className="grid gap-3">
                <div className="flex justify-between items-baseline border-b pb-2">
                  <span className="text-sm font-medium">Recency</span>
                  <span className="font-semibold" style={{ color: STAT }}>{daysSince(selected.lastPurchase)} days</span>
                </div>
                <div className="flex justify-between items-baseline border-b pb-2">
                  <span className="text-sm font-medium">Frequency</span>
                  <span className="font-semibold" style={{ color: STAT }}>{selected.orders} orders</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium">Money spent</span>
                  <span className="font-semibold" style={{ color: STAT }}>€{selected.totalSpent.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
