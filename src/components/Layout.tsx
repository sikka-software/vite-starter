import { Outlet } from "react-router-dom";

import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";
import TopBar from "./TopBar";
import { ThemeProvider } from "next-themes";

export default function Layout() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <div className="min-h-screen w-full bg-background">
          <TopBar />
          <div className="flex w-full p-4">
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
