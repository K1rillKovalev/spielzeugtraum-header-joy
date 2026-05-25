import { useState } from "react";
import { Search, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Role = "admin" | "marketer" | "accountant" | "user";

interface U { id: number; login: string; role: Role; }

const initial: U[] = [
  { id: 1, login: "admin@spielzeugtraum.de", role: "admin" },
  { id: 2, login: "marketing@spielzeugtraum.de", role: "marketer" },
  { id: 3, login: "finance@spielzeugtraum.de", role: "accountant" },
  { id: 4, login: "anna@example.com", role: "user" },
  { id: 5, login: "thomas@example.com", role: "user" },
  { id: 6, login: "sarah@example.com", role: "user" },
  { id: 7, login: "max@example.com", role: "user" },
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
                      <Select value={u.role} onValueChange={(v) => setRole(u.id, v as Role)}>
                        <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="marketer">Marketer</SelectItem>
                          <SelectItem value="accountant">Accountant</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
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
