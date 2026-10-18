import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout() {
  const location = useLocation();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border-subtle px-4">
          <SidebarTrigger />
          <h1 className="text-body font-semibold">
            {location.pathname === "/"
              ? "Overview"
              : location.pathname === "/services"
                ? "Services"
                : location.pathname === "/members"
                  ? "Members"
                  : "Workspace"}
          </h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1280px] flex-1 space-y-6 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
