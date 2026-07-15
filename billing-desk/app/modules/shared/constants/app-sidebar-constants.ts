import {
  CalendarClockIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
} from "lucide-react"
import type { AppSidebarNavItemProps } from "~/shared/types/app-sidebar-types"

export const APP_SIDEBAR_HEADER_TEXT = "Billing Desk"

export const APP_SIDEBAR_NAV_ITEMS: AppSidebarNavItemProps[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Upcoming Renewals",
    url: "/upcoming-renewals",
    icon: CalendarClockIcon,
  },
  {
    title: "Payment",
    url: "/payment",
    icon: CreditCardIcon,
  },
]
