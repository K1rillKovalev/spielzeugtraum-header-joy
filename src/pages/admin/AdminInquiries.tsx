import { useState } from "react";
import { Mail, Reply } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface I { id: number; name: string; email: string; subject: string; message: string; date: string; status: "new" | "replied"; }

const initial: I[] = [
  { id: 1, name: "Anna Müller", email: "anna@example.com", subject: "Order delivery question", message: "When will order #4821 arrive?", date: "2026-05-19", status: "new" },
  { id: 2, name: "Thomas Klein", email: "thomas@example.com", subject: "Damaged product", message: "My doll arrived with broken arm.", date: "2026-05-18", status: "new" },
  { id: 3, name: "Julia Hoffmann", email: "julia@example.com", subject: "Bulk order request", message: "Hi, can you do school discounts?", date: "2026-05-17", status: "replied" },
];

export default function AdminInquiries() {
  const [items, setItems] = useState<I[]>(initial);
  const [reply, setReply] = useState<I | null>(null);
  const [text, setText] = useState("");
  const { toast } = useToast();

  const send = () => {
    if (!reply || !text) return;
    setItems((is) => is.map((i) => (i.id === reply.id ? { ...i, status: "replied" } : i)));
    toast({ title: "Reply sent", description: `Email to ${reply.email}` });
    setReply(null); setText("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Customer Inquiries</h1>

      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">From</th>
                <th className="p-3 font-medium">Subject</th>
                <th className="p-3 font-medium">Message</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-3 text-muted-foreground whitespace-nowrap">{i.date}</td>
                  <td className="p-3">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.email}</div>
                  </td>
                  <td className="p-3 font-medium">{i.subject}</td>
                  <td className="p-3 text-muted-foreground max-w-sm truncate">{i.message}</td>
                  <td className="p-3">
                    <Badge variant={i.status === "new" ? "default" : "secondary"} className="capitalize">{i.status}</Badge>
                  </td>
                  <td className="p-3">
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => setReply(i)}>
                      <Reply className="h-3.5 w-3.5" /> Reply
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={!!reply} onOpenChange={(o) => !o && (setReply(null), setText(""))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Reply to {reply?.name}</DialogTitle>
          </DialogHeader>
          {reply && (
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">To: {reply.email}</div>
              <div className="rounded bg-muted/40 p-3 text-sm">
                <p className="font-semibold mb-1">Re: {reply.subject}</p>
                <p>{reply.message}</p>
              </div>
              <Textarea rows={6} placeholder="Type your reply..." value={text} onChange={(e) => setText(e.target.value)} />
            </div>
          )}
          <DialogFooter>
            <Button onClick={send} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              <Mail className="h-4 w-4" /> Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
