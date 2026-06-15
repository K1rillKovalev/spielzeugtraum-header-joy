import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Catalogue from "./pages/Catalogue.tsx";
import Cart from "./pages/Cart.tsx";
import Account from "./pages/Account.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Shipping from "./pages/Shipping.tsx";
import Privacy from "./pages/Privacy.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCatalogue from "./pages/admin/AdminCatalogue";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminSuppliers from "./pages/admin/AdminSuppliers";
import AdminPromotions from "./pages/admin/AdminPromotions";
import AdminContent from "./pages/admin/AdminContent";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminStats from "./pages/admin/AdminStats";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/security-compliance" element={<SecurityCompliance />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminStats />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="catalogue" element={<AdminCatalogue />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="suppliers" element={<AdminSuppliers />} />
            <Route path="promotions" element={<AdminPromotions />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
