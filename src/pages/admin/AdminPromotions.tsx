import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Promo { id: number; code: string; type: "percent" | "fixed"; value: number; minOrder: number; active: boolean; }

const initial: Promo[] = [
  { id: 1, code: "WELCOME10", type: "percent", value: 10, minOrder: 30, active: true },
  { id: 2, code: "SUMMER25", type: "percent", value: 25, minOrder: 80, active: true },
  { id: 3, code: "FREESHIP", type: "fixed", value: 5, minOrder: 25, active: false },
];

const empty: Omit<Promo, "id"> = { code: "", type: "percent", value: 10, minOrder: 0, active: true };

export default function AdminPromotions() {
  const [list, setList] = useState<Promo[]>(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Promo | null>(null);
  const [form, setForm] = useState(empty);
  const { toast } = useToast();

  const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (p: Promo) => { setEditing(p); const { id, ...r } = p; setForm(r); setOpen(true); };
  const save = () => {
    if (!form.code) return;
    if (editing) setList((l) => l.map((p) => (p.id === editing.id ? { ...editing, ...form } : p)));
    else setList((l) => [{ id: Date.now(), ...form }, ...l]);
    toast({ title: "Promo saved" });
    setOpen(false);
  };
  const remove = (id: number) => { setList((l) => l.filter((p) => p.id !== id)); toast({ title: "Removed" }); };
  const toggle = (id: number) => setList((l) => l.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold">Promotions & Discounts</h1>
        <Button onClick={openCreate} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Plus className="h-4 w-4" /> New Promo Code
        </Button>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="p-3 font-medium">Code</th>
                <th className="p-3 font-medium">Discount</th>
                <th className="p-3 font-medium">Min Order</th>
                <th className="p-3 font-medium">Active</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-3 font-mono font-semibold">{p.code}</td>
                  <td className="p-3">{p.type === "percent" ? `${p.value}%` : `€${p.value}`}</td>
                  <td className="p-3">€{p.minOrder}</td>
                  <td className="p-3"><Switch checked={p.active} onCheckedChange={() => toggle(p.id)} /></td>
                  <td className="p-3 flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(p)}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => remove(p.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Promo" : "New Promo Code"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Code</Label><Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} /></div>
            <div>
              <Label>Discount Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "percent" | "fixed" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Value</Label><Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: parseFloat(e.target.value) || 0 })} /></div>
              <div><Label>Min Order (€)</Label><Input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: parseFloat(e.target.value) || 0 })} /></div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} /> Active
            </label>
          </div>
          <DialogFooter>
            <Button onClick={save} className="bg-accent hover:bg-accent/90 text-accent-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
