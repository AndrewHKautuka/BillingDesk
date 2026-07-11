import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  layout("routes/layout.tsx", [
    index("routes/dashboard.tsx"),
    route("upcoming-renewals", "routes/renewals.tsx"),
  ]),
] satisfies RouteConfig
