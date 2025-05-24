import type { Route } from "./+types/products";
import PageTitle from "~/ui/pageTitle";
import HeroSlider from "~/components/products-page/heroSlider";
import ProductsList from "~/components/products-page/productsList";
import SearchBox from "~/components/searchBox";
import { createClient } from "~/utils/supabase/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products" },
    { name: "description", content: "Lalasia Products Page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const supabase = createClient();
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") || 1;
  const pageSize = 10;
  const offset = (Number(currentPage) - 1) * pageSize;

  const search = url.searchParams.get("search") || "";

  const { data: productIntro } = await supabase
    .from("product_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: productHeroSlide } = await supabase
    .from("product_hero_slide")
    .select("*");

  const { data: productList, count } = await supabase
    .from("product_list")
    .select("*", { count: "exact" })
    .range(offset, offset + pageSize - 1)
    .ilike("title", `%${search}%`);

  return {
    productIntro,
    productHeroSlide,
    productList: { data: productList, count },
  };
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { productIntro, productHeroSlide, productList } = loaderData;
  const totalPages = Math.ceil(productList.count! / 10);

  return (
    <>
      <PageTitle
        title={productIntro?.title!}
        description={productIntro?.description!}
      />
      <HeroSlider data={productHeroSlide!} />
      <div className="mt-6 p-3 flex md:justify-center">
        <div className="w-full md:w-2/3">
          <SearchBox />
        </div>
      </div>
      <ProductsList
        data={productList.data!}
        totalPages={totalPages}
        totalProducts={productList.count!}
      />
    </>
  );
}
