import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface C {
  id: number; name: string; email: string; phone: string;
  registered: string; totalSpent: number; lastPurchase: string;
}

const customers: C[] = [
  { id: 1, name: "Anna Müller", email: "anna@example.com", phone: "+49 170 1234567", registered: "2024-03-12", totalSpent: 845.50, lastPurchase: "2026-05-18" },
  { id: 2, name: "Thomas Klein", email: "thomas@example.com", phone: "+49 171 2345678", registered: "2024-09-04", totalSpent: 412.20, lastPurchase: "2026-04-30" },
  { id: 3, name: "Sarah Lang", email: "sarah@example.com", phone: "+49 152 3456789", registered: "2025-01-20", totalSpent: 1234.99, lastPurchase: "2026-05-15" },
  { id: 4, name: "Max Bauer", email: "max@example.com", phone: "+49 160 4567890", registered: "2023-11-08", totalSpent: 2189.00, lastPurchase: "2026-05-20" },
  { id: 5, name: "Julia Hoffmann", email: "julia@example.com", phone: "+49 175 5678901", registered: "2025-06-15", totalSpent: 327.80, lastPurchase: "2026-03-22" },
];

export default function AdminCustomers() {
  const [q, setQ] = useState("");
  const filtered = customers.filter((c) => {
    const s = q.toLowerCase();
    return c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s) || c.phone.includes(s);
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Customers</h1>
      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name / email / phone..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Email</th>
                  <th className="p-3 font-medium">Phone</th>
                  <th className="p-3 font-medium">Registered</th>
                  <th className="p-3 font-medium">Total Spent</th>
                  <th className="p-3 font-medium">Last Purchase</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-3 font-medium">{c.name}</td>
                    <td className="p-3 text-muted-foreground">{c.email}</td>
                    <td className="p-3 text-muted-foreground">{c.phone}</td>
                    <td className="p-3">{c.registered}</td>
                    <td className="p-3 font-semibold">€{c.totalSpent.toFixed(2)}</td>
                    <td className="p-3">{c.lastPurchase}</td>
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
