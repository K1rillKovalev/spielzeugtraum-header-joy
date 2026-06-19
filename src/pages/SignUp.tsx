import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { saveAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Weak password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords don't match", description: "Please confirm your password.", variant: "destructive" });
      return;
    }
    setVerifyOpen(true);
  };

  const handleConfirm = () => {
    saveAuth({ email, rememberMe });
    setVerifyOpen(false);
    toast({ title: "Welcome to SpielzeugTraum!", description: "Your account has been created." });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="rounded-3xl shadow-xl border-border/40">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-cta/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-cta" />
              </div>
              <CardTitle className="font-heading text-3xl text-primary">Create your account</CardTitle>
              <p className="text-sm text-muted-foreground font-body">
                Join SpielzeugTraum and start collecting buttons!
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-body">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPwd ? "text" : "password"}
                      placeholder="At least 6 characters"
                      className="pl-10 pr-10 rounded-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm" className="font-body">Confirm password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirm"
                      type={showPwd ? "text" : "password"}
                      placeholder="Repeat your password"
                      className="pl-10 rounded-xl"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember" className="text-sm font-body cursor-pointer text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Button type="submit" className="w-full rounded-xl bg-cta hover:bg-cta/90 text-cta-foreground font-semibold h-11">
                  Sign Up
                </Button>
                <p className="text-xs text-center text-muted-foreground font-body">
                  By signing up you agree to our Terms & Privacy Policy.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />

      <Dialog open={verifyOpen} onOpenChange={setVerifyOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <div className="mx-auto w-14 h-14 rounded-2xl bg-cta/10 flex items-center justify-center mb-2">
              <Mail className="w-7 h-7 text-cta" />
            </div>
            <DialogTitle className="text-center font-heading text-2xl text-primary">
              Check your email
            </DialogTitle>
            <DialogDescription className="text-center font-body pt-2">
              We've sent a verification letter to <strong>{email}</strong>.
              Please open your inbox and click the confirmation link to activate your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={handleConfirm}
              className="rounded-xl bg-cta hover:bg-cta/90 text-cta-foreground font-semibold px-8"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
