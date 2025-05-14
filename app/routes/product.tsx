import ProductDetails from "~/components/product-page/productDetails";
import type { Route } from "./+types/product";
import RelatedItems from "~/components/product-page/relatedItems";
import supabase from "~/utils/supabase";
import type { ProductListType } from "~/types/productsType";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product" },
    { name: "description", content: "Lalasia Product Page" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.productId;

  const { data: productData } = await supabase
    .from("product_list")
    .select("*")
    .eq("id", id)
    .single();

  let colorsHex = [];

  const colorIds = productData?.color_id.split(",");

  for (const colorId of colorIds!) {
    const { data: colorHex } = await supabase
      .from("colors")
      .select("*")
      .eq("id", colorId)
      .single();

    colorsHex.push(colorHex);
  }

  const { data: productRelatedItems } = await supabase
    .from("product_list")
    .select("*")
    .eq("category", productData?.category);

  return {
    productData: { product: productData, colorsHex },
    productRelatedItems,
  };
}

export default async function Product({ loaderData }: Route.ComponentProps) {
  const { productData, productRelatedItems } = loaderData;

  return (
    <div className="px-3 md:px-6 lg:p-8">
      <ProductDetails
        data={{
          product: productData.product!,
          colorsHex: productData.colorsHex,
        }}
      />
      <RelatedItems data={productRelatedItems!} />
    </div>
  );
}
