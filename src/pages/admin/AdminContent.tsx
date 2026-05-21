import { useState } from "react";
import { Upload, Trash2, Edit, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Banner { id: number; title: string; subtitle: string; image: string; }
interface Page { id: number; slug: string; title: string; content: string; }

const initialBanners: Banner[] = [
  { id: 1, title: "Summer Sale", subtitle: "Up to 40% off wooden toys", image: "/placeholder.svg" },
  { id: 2, title: "New Arrivals", subtitle: "Discover the latest dolls", image: "/placeholder.svg" },
];

const initialPages: Page[] = [
  { id: 1, slug: "about", title: "About Us", content: "We are SpielzeugTraum, your trusted toy shop since 2010..." },
  { id: 2, slug: "shipping", title: "Shipping & Returns", content: "Free shipping on orders over €50..." },
  { id: 3, slug: "privacy", title: "Privacy Policy", content: "We respect your privacy..." },
];

export default function AdminContent() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [editPage, setEditPage] = useState<Page | null>(null);
  const { toast } = useToast();

  const addBanner = () => {
    setBanners([{ id: Date.now(), title: "New Banner", subtitle: "Edit me", image: "/placeholder.svg" }, ...banners]);
    toast({ title: "Banner added" });
  };
  const updateBanner = (id: number, field: keyof Banner, value: string) =>
    setBanners((bs) => bs.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  const removeBanner = (id: number) => { setBanners((bs) => bs.filter((b) => b.id !== id)); toast({ title: "Removed" }); };

  const savePage = () => {
    if (!editPage) return;
    setPages((ps) => ps.map((p) => (p.id === editPage.id ? editPage : p)));
    setEditPage(null);
    toast({ title: "Page saved" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Content Management</h1>

      <Tabs defaultValue="banners">
        <TabsList>
          <TabsTrigger value="banners">Homepage Banners</TabsTrigger>
          <TabsTrigger value="pages">Static Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="mt-4 space-y-4">
          <Button onClick={addBanner} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
            <Plus className="h-4 w-4" /> New Banner
          </Button>
          <div className="grid sm:grid-cols-2 gap-4">
            {banners.map((b) => (
              <Card key={b.id} className="border-none shadow-md">
                <CardContent className="p-4 space-y-3">
                  <div className="aspect-video bg-muted rounded flex items-center justify-center">
                    <img src={b.image} alt={b.title} className="max-h-full" />
                  </div>
                  <Input value={b.title} onChange={(e) => updateBanner(b.id, "title", e.target.value)} placeholder="Title" />
                  <Input value={b.subtitle} onChange={(e) => updateBanner(b.id, "subtitle", e.target.value)} placeholder="Subtitle" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1 flex-1"><Upload className="h-3.5 w-3.5" /> Upload</Button>
                    <Button variant="outline" size="sm" className="text-destructive" onClick={() => removeBanner(b.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pages" className="mt-4">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3"><CardTitle className="text-base font-display">Static Pages</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30 text-left">
                    <th className="p-3 font-medium">Slug</th>
                    <th className="p-3 font-medium">Title</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="p-3 font-mono text-muted-foreground">/{p.slug}</td>
                      <td className="p-3 font-medium">{p.title}</td>
                      <td className="p-3">
                        <Button variant="ghost" size="sm" className="gap-1" onClick={() => setEditPage(p)}>
                          <Edit className="h-3.5 w-3.5" /> Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editPage} onOpenChange={(o) => !o && setEditPage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Edit Page: {editPage?.title}</DialogTitle></DialogHeader>
          {editPage && (
            <div className="space-y-3">
              <div><Label>Title</Label><Input value={editPage.title} onChange={(e) => setEditPage({ ...editPage, title: e.target.value })} /></div>
              <div><Label>Content</Label><Textarea rows={10} value={editPage.content} onChange={(e) => setEditPage({ ...editPage, content: e.target.value })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={savePage} className="bg-accent hover:bg-accent/90 text-accent-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
