import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Briefcase, Users, BarChart3, Settings, Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/candidates", label: "Candidates", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      <aside className="hidden md:flex w-60 flex-col border-r bg-sidebar text-sidebar-foreground">
        <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Hirelo</span>
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <div className="rounded-lg bg-primary/5 p-3">
            <p className="text-xs font-semibold text-primary">Free trial</p>
            <p className="text-xs text-muted-foreground mt-1">14 days remaining</p>
            <Button size="sm" className="w-full mt-2 bg-accent hover:bg-accent/90 text-accent-foreground">Upgrade</Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-background flex items-center gap-4 px-4 md:px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search jobs, candidates…" className="pl-9 bg-muted/50 border-0" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Acme Corp</span>
            </div>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground">AK</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
