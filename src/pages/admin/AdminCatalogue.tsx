import { useState } from "react";
import { Search, Plus, Edit, Trash2, SlidersHorizontal, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuCheckboxItem, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";


interface P {
  id: number; name: string; category: string; price: number; stock: number;
  description: string; specs: string; image?: string;
}

const initial: P[] = [
  { id: 1, name: "Wooden Train Deluxe", category: "Wooden Toys", price: 34.99, stock: 48, description: "Classic wooden train set.", specs: "Beech wood, 12 pieces, age 3+" },
  { id: 2, name: "Teddy Bear Bruno", category: "Plush", price: 19.99, stock: 120, description: "Soft cuddly bear.", specs: "Cotton, 30 cm, washable" },
  { id: 3, name: "World Map Puzzle", category: "Board Games", price: 14.99, stock: 85, description: "Educational map puzzle.", specs: "100 pieces, age 6+" },
  { id: 4, name: "Red Race Car", category: "Cars", price: 24.99, stock: 63, description: "Pull-back race car.", specs: "Diecast metal, scale 1:24" },
  { id: 5, name: "Doll Marie", category: "Dolls", price: 29.99, stock: 37, description: "Fashion doll with outfits.", specs: "Vinyl, 35 cm, age 4+" },
  { id: 6, name: "Mini Learning Tablet", category: "Educational", price: 44.99, stock: 22, description: "Interactive learning device.", specs: "LCD screen, batteries inc." },
];

const categories = ["Dolls", "Cars", "Educational", "Wooden Toys", "Board Games", "Plush"];
const empty: Omit<P, "id"> = { name: "", category: categories[0], price: 0, stock: 0, description: "", specs: "" };

export default function AdminCatalogue() {
  const [products, setProducts] = useState<P[]>(initial);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<P | null>(null);
  const [form, setForm] = useState(empty);
  const { toast } = useToast();

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (p: P) => { setEditing(p); const { id, ...rest } = p; setForm(rest); setOpen(true); };
  const save = () => {
    if (!form.name || !form.category) { toast({ title: "Name and category required", variant: "destructive" }); return; }
    if (editing) {
      setProducts((ps) => ps.map((p) => (p.id === editing.id ? { ...editing, ...form } : p)));
      toast({ title: "Listing updated" });
    } else {
      setProducts((ps) => [{ id: Date.now(), ...form }, ...ps]);
      toast({ title: "Listing added" });
    }
    setOpen(false);
  };
  const remove = (id: number) => {
    setProducts((ps) => ps.filter((p) => p.id !== id));
    toast({ title: "Listing removed" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-display font-bold">Catalogue Management</h1>
        <Button onClick={openCreate} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Plus className="h-4 w-4" /> New Listing
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card className="border-none shadow-md">
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
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-3">{p.id}</td>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3 font-semibold">€{p.price.toFixed(2)}</td>
                    <td className="p-3"><span className={p.stock < 30 ? "text-destructive font-medium" : ""}>{p.stock}</span></td>
                    <td className="p-3 flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(p)}><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => remove(p.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Edit Listing" : "New Listing"}</DialogTitle></DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <div><Label>Image</Label><Input type="file" accept="image/*" /></div>
            <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Toy Description</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Price (€)</Label><Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} /></div>
              <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} /></div>
            </div>
            <div><Label>Technical Parameters</Label><Textarea rows={2} placeholder="Material, dimensions, age range..." value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button onClick={save} className="bg-accent hover:bg-accent/90 text-accent-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
