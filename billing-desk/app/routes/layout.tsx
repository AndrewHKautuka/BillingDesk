import { Outlet } from "react-router"

import { AppSidebar } from "~/shared/components/app-sidebar"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function LayoutRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <main className="min-h-screen flex-1 p-4">
          <SidebarTrigger />
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}
