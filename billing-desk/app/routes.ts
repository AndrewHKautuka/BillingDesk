import { index, layout, type RouteConfig } from "@react-router/dev/routes"

export default [
  layout("routes/layout.tsx", [index("routes/subscription/dashboard.tsx")]),
] satisfies RouteConfig
