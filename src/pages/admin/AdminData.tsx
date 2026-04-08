import { useState } from "react";
import { Search, Download, Upload, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const products = [
  { id: 1, name: "Wooden Train Deluxe", category: "Wooden Toys", price: "€34.99", stock: 48 },
  { id: 2, name: "Teddy Bear Bruno", category: "Plush", price: "€19.99", stock: 120 },
  { id: 3, name: "World Map Puzzle", category: "Puzzles", price: "€14.99", stock: 85 },
  { id: 4, name: "Red Race Car", category: "Cars", price: "€24.99", stock: 63 },
  { id: 5, name: "Doll Marie", category: "Dolls", price: "€29.99", stock: 37 },
  { id: 6, name: "Mini Learning Tablet", category: "Educational", price: "€44.99", stock: 22 },
];

const orders = [
  { id: "#4821", date: "04/08/2026", customer: "Anna M.", total: "€34.99", status: "Shipped" },
  { id: "#4820", date: "04/08/2026", customer: "Thomas K.", total: "€89.50", status: "Open" },
  { id: "#4819", date: "04/07/2026", customer: "Sarah L.", total: "€19.99", status: "Shipped" },
  { id: "#4818", date: "04/07/2026", customer: "Max B.", total: "€54.00", status: "Paid" },
];

export default function AdminData() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const handleExport = () => toast({ title: "Export started", description: "CSV is being downloaded..." });
  const handleImport = () => toast({ title: "Import", description: "Select a file to import." });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Data Management</h1>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 border-admin-accent text-admin-accent hover:bg-admin-accent hover:text-admin-accent-foreground" onClick={handleImport}>
              <Upload className="h-4 w-4" /> Import CSV
            </Button>
            <Button variant="outline" className="gap-2 border-admin-accent text-admin-accent hover:bg-admin-accent hover:text-admin-accent-foreground" onClick={handleExport}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"><Plus className="h-4 w-4" /> New</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Entry</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Name</Label><Input placeholder="Product name..." /></div>
                  <div><Label>Category</Label><Input placeholder="Category..." /></div>
                  <div><Label>Price</Label><Input placeholder="€0.00" /></div>
                  <div><Label>Stock</Label><Input type="number" placeholder="0" /></div>
                  <div><Label>Upload Image</Label><Input type="file" accept="image/*" /></div>
                </div>
                <DialogFooter>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => toast({ title: "Saved" })}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="products">
          <Card className="border-none shadow-md mt-4">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30 text-left">
                      <th className="p-3 font-medium">ID</th>
                      <th className="p-3 font-medium">Name</th>
                      <th className="p-3 font-medium">Category</th>
                      <th className="p-3 font-medium">Price</th>
                      <th className="p-3 font-medium">Stock</th>
                      <th className="p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())).map((p) => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="p-3">{p.id}</td>
                        <td className="p-3 font-medium">{p.name}</td>
                        <td className="p-3">{p.category}</td>
                        <td className="p-3 font-semibold">{p.price}</td>
                        <td className="p-3">
                          <span className={p.stock < 30 ? "text-destructive font-medium" : ""}>{p.stock}</span>
                        </td>
                        <td className="p-3 flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between p-3 border-t">
                <span className="text-xs text-muted-foreground">Page {page} of 1</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" disabled><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" disabled><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="border-none shadow-md mt-4">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30 text-left">
                      <th className="p-3 font-medium">Order</th>
                      <th className="p-3 font-medium">Date</th>
                      <th className="p-3 font-medium">Customer</th>
                      <th className="p-3 font-medium">Amount</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">{o.id}</td>
                        <td className="p-3">{o.date}</td>
                        <td className="p-3">{o.customer}</td>
                        <td className="p-3 font-semibold">{o.total}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            o.status === "Shipped" ? "bg-admin-success/15 text-admin-success"
                            : o.status === "Open" ? "bg-admin-warning/15 text-admin-warning"
                            : "bg-accent/15 text-accent"
                          }`}>{o.status}</span>
                        </td>
                        <td className="p-3 flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
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
    </div>
  );
}
