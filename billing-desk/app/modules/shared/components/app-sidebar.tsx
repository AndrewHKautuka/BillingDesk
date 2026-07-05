import { APP_SIDEBAR_HEADER_TEXT } from "~/shared/constants/app-sidebar-constants"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader>
        {!isCollapsed && (
          <>
            <div className="p-4 text-center">
              <span className="text-3xl font-bold text-sidebar-foreground">
                {APP_SIDEBAR_HEADER_TEXT}
              </span>
            </div>
            <SidebarSeparator />
          </>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
