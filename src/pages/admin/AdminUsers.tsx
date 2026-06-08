import { useState } from "react";
import { Search, Shield, Lock, Unlock, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Role = "superadmin" | "content manager" | "moderator" | "accountant" | "customer";

const ROLES: Role[] = ["superadmin", "content manager", "moderator", "accountant", "customer"];

interface U { id: number; login: string; role: Role; blocked: boolean; }

const initial: U[] = [
  { id: 1, login: "admin@spielzeugtraum.de", role: "superadmin", blocked: false },
  { id: 2, login: "marketing@spielzeugtraum.de", role: "content manager", blocked: false },
  { id: 3, login: "finance@spielzeugtraum.de", role: "accountant", blocked: false },
  { id: 8, login: "mod@spielzeugtraum.de", role: "moderator", blocked: false },
  { id: 4, login: "anna@example.com", role: "customer", blocked: false },
  { id: 5, login: "thomas@example.com", role: "customer", blocked: true },
  { id: 6, login: "sarah@example.com", role: "customer", blocked: false },
  { id: 7, login: "max@example.com", role: "customer", blocked: false },
];

const roleColors: Record<Role, string> = {
  superadmin: "bg-accent/20 text-accent",
  "content manager": "bg-admin-warning/20 text-admin-warning",
  moderator: "bg-primary/20 text-primary",
  accountant: "bg-admin-success/20 text-admin-success",
  customer: "bg-muted text-muted-foreground",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<U[]>(initial);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<Role>("customer");
  const { toast } = useToast();

  const filtered = users.filter((u) => u.login.toLowerCase().includes(search.toLowerCase()));

  const setRole = (id: number, role: Role) => {
    setUsers((us) => us.map((u) => (u.id === id ? { ...u, role } : u)));
    toast({ title: "Role updated" });
  };

  const toggleBlock = (id: number) => {
    setUsers((us) =>
      us.map((u) => {
        if (u.id !== id) return u;
        const next = !u.blocked;
        toast({ title: next ? "User blocked" : "User unblocked" });
        return { ...u, blocked: next };
      })
    );
  };

  const addUser = () => {
    const email = newEmail.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({ title: "Invalid email", variant: "destructive" });
      return;
    }
    setUsers((us) => [...us, { id: Date.now(), login: email, role: newRole, blocked: false }]);
    toast({ title: "User added" });
    setNewEmail("");
    setNewRole("customer");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-display font-bold">User Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1"><Plus className="h-4 w-4" />New user</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add new user</DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="new-email">Employee's e-mail</Label>
                <Input
                  id="new-email"
                  type="email"
                  placeholder="employee@spielzeugtraum.de"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={newRole} onValueChange={(v) => setNewRole(v as Role)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={addUser}>Add user</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by login..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="p-3 font-medium">Login</th>
                  <th className="p-3 font-medium">Role</th>
                  <th className="p-3 font-medium">Actions</th>
                  <th className="p-3 font-medium text-right">Block</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className={`border-b last:border-0 hover:bg-muted/20 ${u.blocked ? "opacity-50" : ""}`}>
                    <td className="p-3 font-medium">{u.login}</td>
                    <td className="p-3">
                      <Badge className={`gap-1 capitalize ${roleColors[u.role]}`}>
                        {u.role === "superadmin" && <Shield className="h-3 w-3" />}{u.role}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Select value={u.role} onValueChange={(v) => setRole(u.id, v as Role)}>
                        <SelectTrigger className="h-8 w-44"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {ROLES.map((r) => (
                            <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        size="icon"
                        variant={u.blocked ? "destructive" : "outline"}
                        onClick={() => toggleBlock(u.id)}
                        title={u.blocked ? "Unblock user" : "Block user"}
                      >
                        {u.blocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </Button>
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
