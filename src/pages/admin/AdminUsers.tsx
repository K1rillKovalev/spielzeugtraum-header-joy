import { useState } from "react";
import { Search, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Role = "admin" | "marketer" | "accountant" | "user";
type Status = "active" | "blocked";

interface U { id: number; login: string; role: Role; status: Status; }

const initial: U[] = [
  { id: 1, login: "admin@spielzeugtraum.de", role: "admin", status: "active" },
  { id: 2, login: "marketing@spielzeugtraum.de", role: "marketer", status: "active" },
  { id: 3, login: "finance@spielzeugtraum.de", role: "accountant", status: "active" },
  { id: 4, login: "anna@example.com", role: "user", status: "active" },
  { id: 5, login: "thomas@example.com", role: "user", status: "active" },
  { id: 6, login: "sarah@example.com", role: "user", status: "blocked" },
  { id: 7, login: "max@example.com", role: "user", status: "active" },
];

const roleColors: Record<Role, string> = {
  admin: "bg-accent/20 text-accent",
  marketer: "bg-admin-warning/20 text-admin-warning",
  accountant: "bg-admin-success/20 text-admin-success",
  user: "bg-muted text-muted-foreground",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<U[]>(initial);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const filtered = users.filter((u) => u.login.toLowerCase().includes(search.toLowerCase()));

  const setRole = (id: number, role: Role) => {
    setUsers((us) => us.map((u) => (u.id === id ? { ...u, role } : u)));
    toast({ title: "Role updated" });
  };
  const toggle = (id: number) => {
    setUsers((us) => us.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u)));
    toast({ title: "Status changed" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">User Management</h1>
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
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-3 font-medium">{u.login}</td>
                    <td className="p-3">
                      <Badge className={`gap-1 capitalize ${roleColors[u.role]}`}>
                        {u.role === "admin" && <Shield className="h-3 w-3" />}{u.role}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Switch checked={u.status === "active"} onCheckedChange={() => toggle(u.id)} />
                        <span className={u.status === "active" ? "text-admin-success" : "text-destructive"}>{u.status}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Select value={u.role} onValueChange={(v) => setRole(u.id, v as Role)}>
                          <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="marketer">Marketer</SelectItem>
                            <SelectItem value="accountant">Accountant</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" onClick={() => toggle(u.id)}>
                          {u.status === "active" ? "Block" : "Activate"}
                        </Button>
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
