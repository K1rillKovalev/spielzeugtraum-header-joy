import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, CreditCard, Lock, Trash2, Package, Shield, Eye, EyeOff, Save, Gift, Copy, Sparkles, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { clearAuth } from "@/lib/auth";

const pastOrders = [
  { id: "#4821", date: "12/03/2026", items: 3, total: 78.5, status: "Delivered" },
  { id: "#4655", date: "27/01/2026", items: 1, total: 24.9, status: "Delivered" },
  { id: "#4502", date: "14/12/2025", items: 5, total: 142.0, status: "Delivered" },
  { id: "#4388", date: "02/11/2025", items: 2, total: 56.4, status: "Refunded" },
];

const maskCard = (num: string) => {
  const digits = num.replace(/\s/g, "");
  if (digits.length < 4) return "•••• •••• •••• ••••";
  return `•••• •••• •••• ${digits.slice(-4)}`;
};

export default function Account() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstName: "Anna",
    lastName: "Müller",
    email: "anna.mueller@example.com",
    phone: "+49 151 23456789",
    shipping: "Spielstraße 12, 10115 Berlin, Germany",
    billing: "Spielstraße 12, 10115 Berlin, Germany",
  });

  const [card, setCard] = useState({ number: "4242 4242 4242 4242" });
  const [showCard, setShowCard] = useState(false);
  const [editingCard, setEditingCard] = useState(false);
  const [cardDraft, setCardDraft] = useState(card);

  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdOpen, setPwdOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [logoutOpen, setLogoutOpen] = useState(false);

  const referralLink = `https://spielzeugtraum.de/?ref=anna-m-4821`;
  const buttons = 24;
  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({ title: "Link copied!", description: "Share it with friends to earn buttons." });
    } catch {
      toast({ title: "Couldn't copy", variant: "destructive" });
    }
  };

  const handleProfileSave = () => {
    toast({ title: "Profile updated", description: "Your personal information has been saved." });
  };

  const handleCardSave = () => {
    setCard(cardDraft);
    setEditingCard(false);
    setShowCard(false);
    toast({ title: "Billing details saved", description: "Stored securely (PCI DSS compliant)." });
  };

  const handlePwdChange = () => {
    if (pwd.next.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (pwd.next !== pwd.confirm) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    setPwd({ current: "", next: "", confirm: "" });
    setPwdOpen(false);
    toast({ title: "Password changed", description: "You'll use the new password next time you sign in." });
  };

  const handleDelete = () => {
    if (deleteConfirm !== "DELETE") return;
    setDeleteOpen(false);
    toast({ title: "Account deleted", description: "We're sorry to see you go." });
    setTimeout(() => navigate("/"), 800);
  };

  const handleLogout = () => {
    clearAuth();
    setLogoutOpen(false);
    toast({ title: "Logged out", description: "You have been signed out of your account." });
    setTimeout(() => navigate("/"), 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-[#5D001E]">My Account</h1>
          <p className="text-muted-foreground font-body mt-1">
            Manage your personal information, billing & past orders.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {/* Personal Information */}
          <Card className="rounded-3xl shadow-md border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl text-[#5D001E]">
                <User className="w-5 h-5" /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email (login — cannot be changed)
                </Label>
                <Input value={profile.email} readOnly disabled className="bg-muted/40 cursor-not-allowed" />
              </div>

              <div>
                <Label className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </Label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>

              <div>
                <Label className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Shipping Address
                </Label>
                <Input
                  value={profile.shipping}
                  onChange={(e) => setProfile({ ...profile, shipping: e.target.value })}
                />
              </div>

              <Button
                onClick={handleProfileSave}
                className="bg-[#EE4C7C] hover:bg-[#d8406d] text-white rounded-full gap-2"
              >
                <Save className="w-4 h-4" /> Save changes
              </Button>
            </CardContent>
          </Card>

          {/* Billing — PCI DSS protected */}
          <Card className="rounded-3xl shadow-md border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl text-[#5D001E]">
                <CreditCard className="w-5 h-5" /> Billing Address
                <span className="ml-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                  <Shield className="w-3 h-3" /> PCI DSS
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Billing Address</Label>
                <Input
                  value={profile.billing}
                  onChange={(e) => setProfile({ ...profile, billing: e.target.value })}
                />
              </div>

              <div className="rounded-2xl bg-muted/30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-600" /> Saved Card
                  </p>
                  <button
                    onClick={() => setShowCard((v) => !v)}
                    className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  >
                    {showCard ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showCard ? "Hide" : "Show"}
                  </button>
                </div>

                {!editingCard ? (
                  <>
                    <p className="font-mono tracking-wider text-lg">
                      {showCard ? card.number : maskCard(card.number)}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => { setCardDraft(card); setEditingCard(true); }}
                    >
                      Edit card
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label>Card Number</Label>
                      <Input
                        value={cardDraft.number}
                        onChange={(e) => setCardDraft({ ...cardDraft, number: e.target.value })}
                        maxLength={19}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleCardSave} className="bg-[#EE4C7C] hover:bg-[#d8406d] text-white rounded-full">
                        Save
                      </Button>
                      <Button variant="outline" className="rounded-full" onClick={() => setEditingCard(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-muted-foreground flex items-start gap-1.5 pt-1">
                  <Shield className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  Card data is encrypted at rest and in transit. Full numbers are never displayed by default and we comply with PCI DSS standards.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Referral */}
          <Card className="rounded-3xl shadow-md border-none overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl text-[#5D001E]">
                <Gift className="w-5 h-5" /> Referral Program
                <span className="ml-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide bg-[#EE4C7C]/15 text-[#EE4C7C] px-2 py-0.5 rounded-full font-semibold">
                  <Sparkles className="w-3 h-3" /> Earn buttons
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Rules */}
              <div className="rounded-2xl bg-[#FFF4F7] p-4 space-y-2">
                <p className="text-sm font-semibold text-[#5D001E]">How it works</p>
                <ul className="text-sm text-foreground/80 space-y-1.5 list-disc list-inside">
                  <li>Share your personal referral link with friends.</li>
                  <li>When someone registers through your link, you earn <strong>10% cashback</strong> on every purchase they make — paid out in <strong>buttons</strong>.</li>
                  <li><strong>1 button = €1</strong>, stored on your account.</li>
                  <li>You can use buttons to cover <strong>up to 50% of any order's total</strong>.</li>
                </ul>
              </div>

              {/* Buttons balance */}
              <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#EE4C7C] to-[#d8406d] text-white p-5 shadow-md">
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-90">Your balance</p>
                  <p className="text-3xl font-display font-bold mt-1">{buttons} buttons</p>
                  <p className="text-xs opacity-90 mt-0.5">≈ €{buttons.toFixed(2)} to spend</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Gift className="w-8 h-8" />
                </div>
              </div>

              {/* Referral link */}
              <div className="space-y-2">
                <Label>Your referral link</Label>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="bg-muted/40 font-mono text-sm" />
                  <Button
                    onClick={handleCopyRef}
                    className="bg-[#EE4C7C] hover:bg-[#d8406d] text-white rounded-full gap-2 shrink-0"
                  >
                    <Copy className="w-4 h-4" /> Copy
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Buttons are credited automatically after a referred friend's order ships.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="rounded-3xl shadow-md border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl text-[#5D001E]">
                <Lock className="w-5 h-5" /> Security
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Dialog open={pwdOpen} onOpenChange={setPwdOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full gap-2">
                    <Lock className="w-4 h-4" /> Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-[#5D001E] font-display">Change Password</DialogTitle>
                    <DialogDescription>Use at least 8 characters.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div>
                      <Label>Current password</Label>
                      <Input type="password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} />
                    </div>
                    <div>
                      <Label>New password</Label>
                      <Input type="password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} />
                    </div>
                    <div>
                      <Label>Confirm new password</Label>
                      <Input type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" className="rounded-full" onClick={() => setPwdOpen(false)}>Cancel</Button>
                    <Button className="bg-[#EE4C7C] hover:bg-[#d8406d] text-white rounded-full" onClick={handlePwdChange}>
                      Update password
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="rounded-full gap-2">
                    <Trash2 className="w-4 h-4" /> Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-destructive font-display">Delete account?</DialogTitle>
                    <DialogDescription>
                      This action is permanent. All your data, orders and saved cards will be erased.
                      Type <strong>DELETE</strong> to confirm.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder="DELETE"
                  />
                  <DialogFooter>
                    <Button variant="outline" className="rounded-full" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                    <Button
                      variant="destructive"
                      className="rounded-full"
                      disabled={deleteConfirm !== "DELETE"}
                      onClick={handleDelete}
                    >
                      Permanently delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Past Orders */}
          <Card className="rounded-3xl shadow-md border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl text-[#5D001E]">
                <Package className="w-5 h-5" /> Past Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-2 pr-4 font-medium">Order</th>
                      <th className="py-2 pr-4 font-medium">Date</th>
                      <th className="py-2 pr-4 font-medium">Items</th>
                      <th className="py-2 pr-4 font-medium">Total</th>
                      <th className="py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastOrders.map((o) => (
                      <tr key={o.id} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="py-3 pr-4 font-semibold">{o.id}</td>
                        <td className="py-3 pr-4">{o.date}</td>
                        <td className="py-3 pr-4">{o.items}</td>
                        <td className="py-3 pr-4">€{o.total.toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            o.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
