import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  layout("routes/layout.tsx", [
    index("routes/dashboard.tsx"),
    route("upcoming-renewals", "routes/upcoming-renewals.tsx"),
  ]),
] satisfies RouteConfig
