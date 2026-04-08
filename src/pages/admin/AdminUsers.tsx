import { useState } from "react";
import { Plus, Search, Edit, Ban, CheckCircle, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: number; name: string; email: string; role: "admin" | "customer";
  status: "active" | "blocked"; permissions: { view: boolean; edit: boolean; delete: boolean };
}

const initialUsers: UserData[] = [
  { id: 1, name: "Admin User", email: "admin@spielzeugtraum.de", role: "admin", status: "active", permissions: { view: true, edit: true, delete: true } },
  { id: 2, name: "Anna Müller", email: "anna@example.com", role: "customer", status: "active", permissions: { view: true, edit: false, delete: false } },
  { id: 3, name: "Thomas Klein", email: "thomas@example.com", role: "customer", status: "active", permissions: { view: true, edit: true, delete: false } },
  { id: 4, name: "Sarah Lang", email: "sarah@example.com", role: "customer", status: "blocked", permissions: { view: true, edit: false, delete: false } },
  { id: 5, name: "Max Bauer", email: "max@example.com", role: "admin", status: "active", permissions: { view: true, edit: true, delete: true } },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserData | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "customer" as "admin" | "customer" });
  const { toast } = useToast();

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({ title: "Error", description: "All fields are required.", variant: "destructive" });
      return;
    }
    const user: UserData = {
      id: Date.now(), ...newUser, status: "active",
      permissions: newUser.role === "admin" ? { view: true, edit: true, delete: true } : { view: true, edit: false, delete: false },
    };
    setUsers([user, ...users]);
    setNewUser({ name: "", email: "", password: "", role: "customer" });
    setCreateOpen(false);
    toast({ title: "Created", description: `${user.name} has been added.` });
  };

  const toggleStatus = (id: number) => {
    setUsers(users.map((u) =>
      u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u
    ));
    toast({ title: "Status changed" });
  };

  const updatePermission = (id: number, perm: keyof UserData["permissions"], val: boolean) => {
    setUsers(users.map((u) =>
      u.id === id ? { ...u, permissions: { ...u.permissions, [perm]: val } } : u
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-display font-bold">User Management</h1>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              <Plus className="h-4 w-4" /> New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create User</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name</Label><Input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} /></div>
              <div><Label>Email</Label><Input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /></div>
              <div><Label>Password</Label><Input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} /></div>
              <div>
                <Label>Role</Label>
                <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v as "admin" | "customer" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} className="bg-accent hover:bg-accent/90 text-accent-foreground">Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Email</th>
                  <th className="p-3 font-medium">Role</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Permissions</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-3 font-medium">{u.name}</td>
                    <td className="p-3 text-muted-foreground">{u.email}</td>
                    <td className="p-3">
                      <Badge variant={u.role === "admin" ? "default" : "secondary"} className="gap-1">
                        {u.role === "admin" && <Shield className="h-3 w-3" />}
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={u.status === "active"}
                          onCheckedChange={() => toggleStatus(u.id)}
                        />
                        <span className={u.status === "active" ? "text-admin-success" : "text-destructive"}>
                          {u.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        {(["view", "edit", "delete"] as const).map((p) => (
                          <label key={p} className="flex items-center gap-1 text-xs">
                            <Checkbox
                              checked={u.permissions[p]}
                              onCheckedChange={(v) => updatePermission(u.id, p, !!v)}
                            />
                            {p === "view" ? "View" : p === "edit" ? "Edit" : "Delete"}
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <Dialog open={editUser?.id === u.id} onOpenChange={(o) => !o && setEditUser(null)}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditUser(u)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Edit User</DialogTitle></DialogHeader>
                          {editUser && (
                            <div className="space-y-3">
                              <div><Label>Name</Label><Input defaultValue={editUser.name} /></div>
                              <div><Label>Email</Label><Input defaultValue={editUser.email} /></div>
                              <div>
                                <Label>Role</Label>
                                <Select defaultValue={editUser.role}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="customer">Customer</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button onClick={() => { setEditUser(null); toast({ title: "Saved" }); }}
                              className="bg-accent hover:bg-accent/90 text-accent-foreground">
                              Save
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
