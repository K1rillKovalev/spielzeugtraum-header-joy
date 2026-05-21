import { useState } from "react";
import { Download, X, RefreshCw, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Status = "Paid" | "Processing" | "Shipped" | "Cancelled";
interface Order {
  id: string; date: string; customer: string; total: number; status: Status;
  items: { name: string; qty: number; price: number }[];
  address: string;
}
interface Refund { id: string; orderId: string; customer: string; reason: string; status: "pending" | "approved" | "rejected"; }

const initialOrders: Order[] = [
  { id: "#4821", date: "2026-05-18", customer: "anna@example.com", total: 34.99, status: "Shipped",
    items: [{ name: "Wooden Train Deluxe", qty: 1, price: 34.99 }], address: "Spielstr. 1, 10115 Berlin" },
  { id: "#4820", date: "2026-05-18", customer: "thomas@example.com", total: 89.50, status: "Processing",
    items: [{ name: "Teddy Bear Bruno", qty: 2, price: 19.99 }, { name: "Red Race Car", qty: 2, price: 24.76 }], address: "Hauptstr. 22, 80331 München" },
  { id: "#4819", date: "2026-05-17", customer: "sarah@example.com", total: 19.99, status: "Shipped",
    items: [{ name: "Teddy Bear Bruno", qty: 1, price: 19.99 }], address: "Marktplatz 5, 50667 Köln" },
  { id: "#4818", date: "2026-05-17", customer: "max@example.com", total: 54.00, status: "Paid",
    items: [{ name: "Doll Marie", qty: 1, price: 29.99 }, { name: "World Map Puzzle", qty: 1, price: 14.99 }], address: "Lindenallee 8, 20095 Hamburg" },
];

const initialRefunds: Refund[] = [
  { id: "R-101", orderId: "#4815", customer: "julia@example.com", reason: "Damaged on arrival", status: "pending" },
  { id: "R-102", orderId: "#4812", customer: "anna@example.com", reason: "Wrong color", status: "pending" },
];

const statusColors: Record<Status, string> = {
  Paid: "bg-accent/15 text-accent",
  Processing: "bg-admin-warning/15 text-admin-warning",
  Shipped: "bg-admin-success/15 text-admin-success",
  Cancelled: "bg-destructive/15 text-destructive",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [refunds, setRefunds] = useState<Refund[]>(initialRefunds);
  const [open, setOpen] = useState<Order | null>(null);
  const { toast } = useToast();

  const updateStatus = (id: string, status: Status) => {
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
    toast({ title: `Order ${id} → ${status}` });
  };
  const cancel = (id: string) => updateStatus(id, "Cancelled");

  const exportCsv = () => {
    const header = ["Order", "Date", "Customer", "Total", "Status"];
    const rows = orders.map((o) => [o.id, o.date, o.customer, o.total.toFixed(2), o.status]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "orders.csv"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "CSV exported" });
  };

  const setRefund = (id: string, s: Refund["status"]) => {
    setRefunds((rs) => rs.map((r) => (r.id === id ? { ...r, status: s } : r)));
    toast({ title: `Refund ${id} ${s}` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-display font-bold">Orders</h1>
        <Button variant="outline" onClick={exportCsv} className="gap-2"><Download className="h-4 w-4" /> Export CSV</Button>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">All Orders</TabsTrigger>
          <TabsTrigger value="returns">Return Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30 text-left">
                      <th className="p-3 font-medium">Order #</th>
                      <th className="p-3 font-medium">Date</th>
                      <th className="p-3 font-medium">Customer</th>
                      <th className="p-3 font-medium">Total</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b last:border-0 hover:bg-muted/20 cursor-pointer" onClick={() => setOpen(o)}>
                        <td className="p-3 font-medium">{o.id}</td>
                        <td className="p-3">{o.date}</td>
                        <td className="p-3 text-muted-foreground">{o.customer}</td>
                        <td className="p-3 font-semibold">€{o.total.toFixed(2)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[o.status]}`}>{o.status}</span>
                        </td>
                        <td className="p-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2 items-center">
                            <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v as Status)}>
                              <SelectTrigger className="h-7 w-32 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Processing">Processing</SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => cancel(o.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="returns" className="mt-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30 text-left">
                      <th className="p-3 font-medium">Refund #</th>
                      <th className="p-3 font-medium">Order</th>
                      <th className="p-3 font-medium">Customer</th>
                      <th className="p-3 font-medium">Reason</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refunds.map((r) => (
                      <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="p-3 font-medium">{r.id}</td>
                        <td className="p-3">{r.orderId}</td>
                        <td className="p-3 text-muted-foreground">{r.customer}</td>
                        <td className="p-3">{r.reason}</td>
                        <td className="p-3 capitalize">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            r.status === "approved" ? "bg-admin-success/15 text-admin-success"
                            : r.status === "rejected" ? "bg-destructive/15 text-destructive"
                            : "bg-admin-warning/15 text-admin-warning"
                          }`}>{r.status}</span>
                        </td>
                        <td className="p-3 flex gap-1">
                          <Button variant="outline" size="sm" className="gap-1 h-7" onClick={() => setRefund(r.id, "approved")}>
                            <Check className="h-3 w-3" /> Approve
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1 h-7 text-destructive" onClick={() => setRefund(r.id, "rejected")}>
                            <X className="h-3 w-3" /> Reject
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Order {open?.id}</DialogTitle></DialogHeader>
          {open && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Date:</span> {open.date}</div>
                <div><span className="text-muted-foreground">Status:</span> {open.status}</div>
                <div className="col-span-2"><span className="text-muted-foreground">Customer:</span> {open.customer}</div>
                <div className="col-span-2"><span className="text-muted-foreground">Shipping:</span> {open.address}</div>
              </div>
              <div>
                <p className="font-semibold mb-1">Items</p>
                <ul className="space-y-1">
                  {open.items.map((it, i) => (
                    <li key={i} className="flex justify-between border-b pb-1">
                      <span>{it.qty}× {it.name}</span><span>€{(it.qty * it.price).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <p className="flex justify-between font-bold pt-2">Total <span>€{open.total.toFixed(2)}</span></p>
              </div>
              <Button className="w-full gap-2" variant="outline" onClick={() => updateStatus(open.id, "Shipped")}>
                <RefreshCw className="h-4 w-4" /> Mark as shipped
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
