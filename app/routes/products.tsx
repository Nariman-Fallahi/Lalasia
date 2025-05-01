import type { Route } from "./+types/products";
import PageTitle from "~/ui/pageTitle";
import HeroSlider from "~/components/products/heroSlider";
import ProductsList from "~/components/products/productsList";
import SearchBox from "~/components/searchBox";
import supabase from "~/utils/supabase";
import type {
  ProductHeroSlideType,
  ProductIntroType,
  ProductListType,
} from "~/types/productsType";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products" },
    { name: "description", content: "Lalasia Products Page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") || 1;
  const pageSize = 10;
  const offset = (Number(currentPage) - 1) * pageSize;

  const search = url.searchParams.get("search") || "";

  let { data: product_intro }: { data: ProductIntroType | null } =
    await supabase.from("product_intro").select("*").eq("id", 1).single();

  let { data: product_hero_slide }: { data: ProductHeroSlideType[] | null } =
    await supabase.from("product_hero_slide").select("*");

  let {
    data: product_list,
    count,
  }: { data: ProductListType[] | null; count: number | null } = await supabase
    .from("product_list")
    .select("*", { count: "exact" })
    .range(offset, offset + pageSize - 1)
    .ilike("title", `%${search}%`);

  return {
    product_intro,
    product_hero_slide,
    product_list: { data: product_list, count },
  };
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { product_intro, product_hero_slide, product_list } = loaderData;
  const totalPages = Math.ceil(product_list.count! / 10);

  return (
    <>
      <PageTitle
        title={product_intro?.title!}
        description={product_intro?.description!}
      />
      <HeroSlider data={product_hero_slide!} />
      <div className="mt-6 p-3 flex md:justify-center">
        <div className="w-full md:w-2/3">
          <SearchBox />
        </div>
      </div>
      <ProductsList
        data={product_list.data!}
        totalPages={totalPages}
        totalProducts={product_list.count!}
      />
    </>
  );
}
