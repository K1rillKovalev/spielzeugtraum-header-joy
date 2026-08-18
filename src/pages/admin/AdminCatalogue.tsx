import { useState } from "react";
import { Search, Plus, FolderPlus, Edit, Trash2, SlidersHorizontal, X, ChevronDown, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";


interface P {
  id: number; name: string; category: string; price: number; stock: number;
  description: string; specs: string; image?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: string | null;
}

const initial: P[] = [
  { id: 1, name: "Wooden Train Deluxe", category: "Wooden Toys", price: 34.99, stock: 48, description: "Classic wooden train set.", specs: "Beech wood, 12 pieces, age 3+" },
  { id: 2, name: "Teddy Bear Bruno", category: "Plush", price: 19.99, stock: 120, description: "Soft cuddly bear.", specs: "Cotton, 30 cm, washable" },
  { id: 3, name: "World Map Puzzle", category: "Board Games", price: 14.99, stock: 85, description: "Educational map puzzle.", specs: "100 pieces, age 6+" },
  { id: 4, name: "Red Race Car", category: "Cars", price: 24.99, stock: 63, description: "Pull-back race car.", specs: "Diecast metal, scale 1:24" },
  { id: 5, name: "Doll Marie", category: "Dolls", price: 29.99, stock: 37, description: "Fashion doll with outfits.", specs: "Vinyl, 35 cm, age 4+" },
  { id: 6, name: "Mini Learning Tablet", category: "Educational", price: 44.99, stock: 22, description: "Interactive learning device.", specs: "LCD screen, batteries inc." },
];

const initialCategories: Category[] = [
  { id: 1, name: "Dolls", slug: "dolls", parent: null },
  { id: 2, name: "Cars", slug: "cars", parent: null },
  { id: 3, name: "Educational", slug: "educational", parent: null },
  { id: 4, name: "Wooden Toys", slug: "wooden-toys", parent: null },
  { id: 5, name: "Board Games", slug: "board-games", parent: null },
  { id: 6, name: "Plush", slug: "plush", parent: null },
];

const ROOT_OPTION = "__root__";
const STOCK_MAX = 200;

const empty: Omit<P, "id"> = { name: "", category: initialCategories[0].name, price: 0, stock: 0, description: "", specs: "" };

const emptyCategory: Omit<Category, "id"> = { name: "", slug: "", parent: null };

export default function AdminCatalogue() {
  const [products, setProducts] = useState<P[]>(initial);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<P | null>(null);
  const [form, setForm] = useState(empty);
  const [catFilter, setCatFilter] = useState("all");
  const [stockRange, setStockRange] = useState<[number, number]>([0, STOCK_MAX]);
  const [sort, setSort] = useState("none");
  const [expandedFilter, setExpandedFilter] = useState({ category: true, stock: true });
  const [deleteTarget, setDeleteTarget] = useState<P | null>(null);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [categoryErrors, setCategoryErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const hasStockFilter = stockRange[0] > 0 || stockRange[1] < STOCK_MAX;
  const activeFilters = (catFilter !== "all" ? 1 : 0) + (hasStockFilter ? 1 : 0);
  const clearFilters = () => { setCatFilter("all"); setStockRange([0, STOCK_MAX]); };

  const sorters: Record<string, (a: P, b: P) => number> = {
    "price-desc": (a, b) => b.price - a.price,
    "price-asc": (a, b) => a.price - b.price,
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
    "category-asc": (a, b) => a.category.localeCompare(b.category),
    "category-desc": (a, b) => b.category.localeCompare(a.category),
  };

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (catFilter === "all" ? true : p.category === catFilter))
    .filter((p) => p.stock >= stockRange[0] && p.stock <= stockRange[1])
    .sort(sorters[sort] ?? (() => 0));


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
  const confirmRemove = () => {
    if (!deleteTarget) return;
    setProducts((ps) => ps.filter((p) => p.id !== deleteTarget.id));
    toast({ title: "Listing removed" });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-display font-bold">Catalogue Management</h1>
        <Button onClick={openCreate} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Plus className="h-4 w-4" /> New Listing
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 shrink-0">
              <SlidersHorizontal className="h-4 w-4" /> Filter
              {activeFilters > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {activeFilters}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 max-w-[calc(100vw-2rem)] bg-popover">
            <DropdownMenuLabel
              className="flex cursor-pointer items-center justify-between px-2 py-2"
              onClick={() => setExpandedFilter((state) => ({ ...state, category: !state.category }))}
            >
              Category
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilter.category ? "rotate-180" : ""}`} />
            </DropdownMenuLabel>
            {expandedFilter.category && (
              <DropdownMenuRadioGroup value={catFilter} onValueChange={setCatFilter}>
                <DropdownMenuRadioItem value="all">All categories</DropdownMenuRadioItem>
                {categories.map((c) => (
                  <DropdownMenuRadioItem key={c.id} value={c.name}>{c.name}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuLabel
              className="flex cursor-pointer items-center justify-between px-2 py-2"
              onClick={() => setExpandedFilter((state) => ({ ...state, stock: !state.stock }))}
            >
              Stock
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilter.stock ? "rotate-180" : ""}`} />
            </DropdownMenuLabel>
            {expandedFilter.stock && (
              <div className="space-y-3 px-2 pb-3 pt-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{stockRange[0]} items</span>
                  <span>{stockRange[1]} items</span>
                </div>
                <Slider
                  aria-label="Stock range"
                  min={0}
                  max={STOCK_MAX}
                  step={1}
                  value={stockRange}
                  onValueChange={(value) => {
                    const nextRange: [number, number] = [value[0] ?? 0, value[1] ?? STOCK_MAX];
                    setStockRange(nextRange);
                  }}
                  className="py-1"
                />
              </div>
            )}

            {activeFilters > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={clearFilters} className="text-destructive">
                  <X className="h-3.5 w-3.5 mr-2" /> Clear filters
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 shrink-0">
              <ArrowUpDown className="h-4 w-4" /> Sort
              {sort !== "none" && (
                <span className="ml-1 h-2 w-2 rounded-full bg-accent" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72 max-w-[calc(100vw-2rem)] bg-popover">
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuLabel>Default</DropdownMenuLabel>
              <DropdownMenuRadioItem value="none">Default order</DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Price</DropdownMenuLabel>
              <DropdownMenuRadioItem value="price-desc">Most expensive first</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-asc">Least expensive first</DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Name</DropdownMenuLabel>
              <DropdownMenuRadioItem value="name-asc">Name A – Z</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name-desc">Name Z – A</DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuRadioItem value="category-asc">Category A – Z</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="category-desc">Category Z – A</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteTarget(p)}><Trash2 className="h-3.5 w-3.5" /></Button>
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
              <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
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

      <Dialog open={deleteTarget !== null} onOpenChange={(isOpen) => { if (!isOpen) setDeleteTarget(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete listing?</DialogTitle>
            <DialogDescription>
              Are you sure you want to completely delete “{deleteTarget?.name}”? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmRemove}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
