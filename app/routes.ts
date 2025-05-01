import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx"),
  route("product/:productId", "routes/product.tsx"),
  route("services", "routes/services.tsx"),
  route("article", "routes/article.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
