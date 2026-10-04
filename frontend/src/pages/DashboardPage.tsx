import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="font-heading text-xl font-semibold uppercase tracking-wide">
            Overview
          </h1>
        </header>

        <main className="flex-1 p-6">
          <p className="text-muted-foreground">
            Your organizations and services will appear here.
          </p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
