import { useState } from "react";
import { Bell, Search, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function AdminTopbar() {
  const [notifications] = useState(3);

  return (
    <header className="h-14 bg-primary border-b border-primary/20 flex items-center px-3 gap-3 shrink-0">
      <SidebarTrigger className="text-primary-foreground hover:bg-primary/80" />

      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
          <Input
            placeholder="Suche..."
            className="pl-9 h-8 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8"
        >
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
              {notifications}
            </Badge>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 h-8 gap-2 px-2"
            >
              <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                A
              </div>
              <span className="text-sm hidden md:inline">Admin</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> Profil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" /> Einstellungen
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Abmelden
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
