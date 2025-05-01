import ProductDetails from "~/components/product/productDetails";
import type { Route } from "./+types/product";
import RelatedItems from "~/components/product/relatedItems";
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

  let { data: product_data }: { data: ProductListType | null } = await supabase
    .from("product_list")
    .select("*")
    .eq("id", id)
    .single();

  let colorsHex = [];

  const colors = product_data?.color_id.split(",");

  for (const colorId of colors!) {
    let { data: colors_hex }: { data: { id: number; hex: string } | null } =
      await supabase.from("colors").select("*").eq("id", colorId).single();

    colorsHex?.push(colors_hex);
  }

  let { data: product_related_items }: { data: ProductListType[] | null } =
    await supabase
      .from("product_list")
      .select("*")
      .eq("category", product_data?.category);

  return { productData: { product_data, colorsHex }, product_related_items };
}

export default async function Product({ loaderData }: Route.ComponentProps) {
  const { productData, product_related_items } = loaderData;

  return (
    <div className="px-3 md:px-6 lg:p-8">
      <ProductDetails
        data={{
          product: productData.product_data!,
          colorsHex: productData.colorsHex,
        }}
      />
      <RelatedItems data={product_related_items!} />
    </div>
  );
}
