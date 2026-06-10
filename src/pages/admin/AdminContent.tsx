import { useState } from "react";
import { Upload, Trash2, Edit, Plus, Clock, CheckCircle2, Archive } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

type BannerStatus = "active" | "upcoming" | "archived";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  startDate: string;
  endDate: string;
}

interface Page { id: number; slug: string; title: string; content: string; }

const TODAY = new Date("2026-06-09");

function getBannerStatus(startDate: string, endDate: string): BannerStatus {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (TODAY < start) return "upcoming";
  if (TODAY > end) return "archived";
  return "active";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const statusConfig: Record<BannerStatus, { label: string; color: string; icon: React.ReactNode; borderColor: string; bgColor: string }> = {
  active: {
    label: "Active",
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50/50",
  },
  upcoming: {
    label: "Upcoming",
    color: "bg-sky-100 text-sky-700 border-sky-300",
    icon: <Clock className="h-3.5 w-3.5" />,
    borderColor: "border-sky-400",
    bgColor: "bg-sky-50/50",
  },
  archived: {
    label: "Archived",
    color: "bg-slate-100 text-slate-600 border-slate-300",
    icon: <Archive className="h-3.5 w-3.5" />,
    borderColor: "border-slate-400",
    bgColor: "bg-slate-50/50",
  },
};

const initialBanners: Banner[] = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 40% off wooden toys",
    image: "/placeholder.svg",
    startDate: "2026-05-01",
    endDate: "2026-08-31",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover the latest dolls",
    image: "/placeholder.svg",
    startDate: "2026-06-15",
    endDate: "2026-07-15",
  },
  {
    id: 3,
    title: "Winter Wonderland",
    subtitle: "Cozy toys for cold days",
    image: "/placeholder.svg",
    startDate: "2025-12-01",
    endDate: "2026-02-28",
  },
];

const initialPages: Page[] = [
  { id: 1, slug: "about", title: "About Us", content: "SpielzeugTraum was born from a simple belief: every child deserves a tiny universe where imagination is the only law..." },
  { id: 2, slug: "contact", title: "Contact Us", content: "Behind every order is a small team of toy-lovers ready to chat about anything from missing puzzle pieces to which dollhouse best fits a rainy Sunday..." },
  { id: 3, slug: "shipping", title: "Shipping & Returns", content: "Every parcel from SpielzeugTraum begins its journey wrapped in recycled paper, a paper-star sticker, and a wink of fairy dust..." },
  { id: 4, slug: "privacy", title: "Privacy Policy", content: "At SpielzeugTraum we treat your personal information the way we treat a freshly painted rocking horse — with great care..." },
];

export default function AdminContent() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [editPage, setEditPage] = useState<Page | null>(null);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const { toast } = useToast();

  const addBanner = () => {
    const today = TODAY.toISOString().split("T")[0];
    const nextMonth = new Date(TODAY);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setBanners([
      {
        id: Date.now(),
        title: "New Banner",
        subtitle: "Edit me",
        image: "/placeholder.svg",
        startDate: today,
        endDate: nextMonth.toISOString().split("T")[0],
      },
      ...banners,
    ]);
    toast({ title: "Banner added" });
  };

  const updateBanner = (id: number, field: keyof Banner, value: string) =>
    setBanners((bs) => bs.map((b) => (b.id === id ? { ...b, [field]: value } : b)));

  const removeBanner = (id: number) => {
    setBanners((bs) => bs.filter((b) => b.id !== id));
    toast({ title: "Removed" });
  };

  const saveBanner = () => {
    if (!editBanner) return;
    setBanners((bs) => bs.map((b) => (b.id === editBanner.id ? editBanner : b)));
    setEditBanner(null);
    toast({ title: "Banner saved" });
  };

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
            {banners.map((b) => {
              const status = getBannerStatus(b.startDate, b.endDate);
              const config = statusConfig[status];
              return (
                <Card
                  key={b.id}
                  className={`border-none shadow-md ${config.bgColor} border-t-4 ${config.borderColor}`}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${config.color} gap-1 font-semibold`}>
                        {config.icon}
                        {config.label}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 h-8 w-8 p-0"
                        onClick={() => setEditBanner(b)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="aspect-video bg-muted rounded flex items-center justify-center overflow-hidden">
                      <img src={b.image} alt={b.title} className="max-h-full" />
                    </div>
                    <Input
                      value={b.title}
                      onChange={(e) => updateBanner(b.id, "title", e.target.value)}
                      placeholder="Title"
                    />
                    <Input
                      value={b.subtitle}
                      onChange={(e) => updateBanner(b.id, "subtitle", e.target.value)}
                      placeholder="Subtitle"
                    />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/60 rounded-lg px-3 py-2">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        <span className="font-medium text-foreground">{formatDate(b.startDate)}</span>
                        {" — "}
                        <span className="font-medium text-foreground">{formatDate(b.endDate)}</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1 flex-1">
                        <Upload className="h-3.5 w-3.5" /> Upload
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => removeBanner(b.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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

      {/* Edit Banner Dialog */}
      <Dialog open={!!editBanner} onOpenChange={(o) => !o && setEditBanner(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Banner: {editBanner?.title}</DialogTitle>
          </DialogHeader>
          {editBanner && (
            <div className="space-y-3">
              <div>
                <Label>Title</Label>
                <Input
                  value={editBanner.title}
                  onChange={(e) => setEditBanner({ ...editBanner, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={editBanner.subtitle}
                  onChange={(e) => setEditBanner({ ...editBanner, subtitle: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={editBanner.startDate}
                    onChange={(e) => setEditBanner({ ...editBanner, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={editBanner.endDate}
                    onChange={(e) => setEditBanner({ ...editBanner, endDate: e.target.value })}
                  />
                </div>
              </div>
              {(() => {
                const status = getBannerStatus(editBanner.startDate, editBanner.endDate);
                const config = statusConfig[status];
                return (
                  <div className="flex items-center gap-2 pt-1">
                    <Badge variant="outline" className={`${config.color} gap-1 font-semibold`}>
                      {config.icon}
                      {config.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(editBanner.startDate)} — {formatDate(editBanner.endDate)}
                    </span>
                  </div>
                );
              })()}
            </div>
          )}
          <DialogFooter>
            <Button onClick={saveBanner} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Save Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Page Dialog */}
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
