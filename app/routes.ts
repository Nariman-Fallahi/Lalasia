import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    route("products", "routes/products.tsx"),
    route("product/:productId", "routes/product.tsx"),
    route("services", "routes/services.tsx"),
    route("article", "routes/article.tsx"),
    route("about", "routes/about.tsx"),
  ]),

  layout("./layouts/auth-layout.tsx", [
    ...prefix("auth", [
      index("routes/auth.tsx"),
      route("verify-email", "routes/verifyEmail.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
