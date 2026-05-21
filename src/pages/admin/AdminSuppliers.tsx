import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Sup { id: number; name: string; contact: string; email: string; phone: string; category: string; }

const initial: Sup[] = [
  { id: 1, name: "HolzWerk GmbH", contact: "K. Berger", email: "kontakt@holzwerk.de", phone: "+49 30 1112233", category: "Wooden Toys" },
  { id: 2, name: "PlushCraft AG", contact: "L. Wagner", email: "info@plushcraft.de", phone: "+49 40 4445566", category: "Plush" },
  { id: 3, name: "Modellbau Schmidt", contact: "F. Schmidt", email: "f.schmidt@mb.de", phone: "+49 89 7778899", category: "Cars" },
];

const empty: Omit<Sup, "id"> = { name: "", contact: "", email: "", phone: "", category: "" };

export default function AdminSuppliers() {
  const [list, setList] = useState<Sup[]>(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Sup | null>(null);
  const [form, setForm] = useState(empty);
  const { toast } = useToast();

  const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (s: Sup) => { setEditing(s); const { id, ...r } = s; setForm(r); setOpen(true); };
  const save = () => {
    if (!form.name) return;
    if (editing) setList((l) => l.map((s) => (s.id === editing.id ? { ...editing, ...form } : s)));
    else setList((l) => [{ id: Date.now(), ...form }, ...l]);
    toast({ title: editing ? "Supplier updated" : "Supplier added" });
    setOpen(false);
  };
  const remove = (id: number) => { setList((l) => l.filter((s) => s.id !== id)); toast({ title: "Removed" }); };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold">Suppliers</h1>
        <Button onClick={openCreate} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Plus className="h-4 w-4" /> New Supplier
        </Button>
      </div>
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Contact Person</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Phone</th>
                <th className="p-3 font-medium">Category</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3">{s.contact}</td>
                  <td className="p-3 text-muted-foreground">{s.email}</td>
                  <td className="p-3 text-muted-foreground">{s.phone}</td>
                  <td className="p-3">{s.category}</td>
                  <td className="p-3 flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(s)}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => remove(s.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Supplier" : "New Supplier"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Company Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Contact Person</Label><Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></div>
            <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button onClick={save} className="bg-accent hover:bg-accent/90 text-accent-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
