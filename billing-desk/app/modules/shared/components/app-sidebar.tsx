import { Link } from "react-router"

import {
  APP_SIDEBAR_HEADER_TEXT,
  APP_SIDEBAR_NAV_ITEMS,
} from "~/shared/constants/app-sidebar-constants"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
              <h2 className="text-sidebar-foreground">
                {APP_SIDEBAR_HEADER_TEXT}
              </h2>
            </div>
            <SidebarSeparator />
          </>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {APP_SIDEBAR_NAV_ITEMS.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton render={<Link to={item.url} />}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
