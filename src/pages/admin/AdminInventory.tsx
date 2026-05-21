import { useState } from "react";
import { Plus, Minus, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface S { id: number; name: string; stock: number; min: number; }

const initial: S[] = [
  { id: 1, name: "Wooden Train Deluxe", stock: 48, min: 20 },
  { id: 2, name: "Teddy Bear Bruno", stock: 120, min: 30 },
  { id: 3, name: "World Map Puzzle", stock: 85, min: 25 },
  { id: 4, name: "Red Race Car", stock: 63, min: 20 },
  { id: 5, name: "Doll Marie", stock: 18, min: 20 },
  { id: 6, name: "Mini Learning Tablet", stock: 22, min: 25 },
];

export default function AdminInventory() {
  const [items, setItems] = useState<S[]>(initial);
  const [adjust, setAdjust] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const change = (id: number, delta: number) => {
    setItems((is) => is.map((i) => (i.id === id ? { ...i, stock: Math.max(0, i.stock + delta) } : i)));
  };
  const apply = (id: number) => {
    const v = parseInt(adjust[id] || "0");
    if (!v) return;
    change(id, v);
    setAdjust({ ...adjust, [id]: "" });
    toast({ title: `Stock ${v > 0 ? "added" : "written-off"}` });
  };

  const totalOrders = 32; // demo current daily orders
  const crmThreshold = 50;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Inventory Management</h1>

      <Card className="border-none shadow-md bg-admin-card">
        <CardContent className="p-5 flex items-center gap-4">
          <AlertTriangle className="h-8 w-8 text-admin-warning shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Today's orders: {totalOrders} / {crmThreshold}</p>
            <p className="text-muted-foreground">
              When daily orders exceed {crmThreshold}, the system will recommend migrating to a licensed CRM.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader className="pb-3"><CardTitle className="text-base font-display">Stock Levels</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="p-3 font-medium">Product</th>
                  <th className="p-3 font-medium">In Stock</th>
                  <th className="p-3 font-medium">Min Threshold</th>
                  <th className="p-3 font-medium">Quick Adjust</th>
                  <th className="p-3 font-medium">Manual (+/−)</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-b last:border-0">
                    <td className="p-3 font-medium">{i.name}</td>
                    <td className="p-3">
                      <span className={i.stock < i.min ? "text-destructive font-bold" : "font-semibold"}>{i.stock}</span>
                      {i.stock < i.min && <span className="ml-2 text-xs text-destructive">Low</span>}
                    </td>
                    <td className="p-3 text-muted-foreground">{i.min}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => change(i.id, -1)}><Minus className="h-3 w-3" /></Button>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => change(i.id, +1)}><Plus className="h-3 w-3" /></Button>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Input
                          className="h-7 w-20"
                          placeholder="±qty"
                          value={adjust[i.id] || ""}
                          onChange={(e) => setAdjust({ ...adjust, [i.id]: e.target.value })}
                        />
                        <Button variant="outline" size="sm" className="h-7" onClick={() => apply(i.id)}>Apply</Button>
                      </div>
                    </td>
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
