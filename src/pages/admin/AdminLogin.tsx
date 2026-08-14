import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { adminAuth } from "@/lib/adminAuth";

export default function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const session = adminAuth.login(login, password, remember);
    if (session) {
      toast({ title: "Welcome back", description: `Logged in as ${session.login}` });
      navigate("/admin");
    } else {
      toast({ title: "Invalid credentials", description: "Try admin / admin", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-admin-bg p-4">
      <Card className="w-full max-w-sm border-none shadow-xl">
        <CardContent className="p-8 space-y-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-xl font-bold">SpielzeugTraum Admin</h1>
            <p className="text-xs text-muted-foreground">Sign in to access the dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="login">Login</Label>
              <Input id="login" autoComplete="username" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="admin" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
              Remember me
            </label>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              <Lock className="h-4 w-4" /> Sign in
            </Button>
            <p className="text-[11px] text-center text-muted-foreground">Demo: admin / admin</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
