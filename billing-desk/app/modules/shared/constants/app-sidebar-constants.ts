import { TestTube2Icon, TestTubeIcon } from "lucide-react"

import type { AppSidebarNavItemProps } from "../types/app-sidebar-types"

export const APP_SIDEBAR_HEADER_TEXT = "Billing Desk"

export const APP_SIDEBAR_NAV_ITEMS: AppSidebarNavItemProps[] = [
  {
    title: "Test",
    url: "/t",
    icon: TestTubeIcon,
  },
  {
    title: "Test 2",
    url: "/test",
    icon: TestTube2Icon,
    isActive: false,
  },
]
