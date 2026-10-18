import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";
import { useLocation } from "react-router";

export default function DashboardLayout() {
  const location = useLocation();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="font-heading text-xl font-semibold uppercase tracking-wide">
            {location.pathname === "/"
              ? "Overview"
              : location.pathname === "/services"
                ? "Services"
                : location.pathname.slice(1)}
          </h1>
        </header>
        <main className="flex-1 space-y-4 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
