import Header from "~/components/home/header";
import type { Route } from "./+types/home";
import Benefits from "~/components/home/benefits";
import Product from "~/components/home/product";
import OurProduct from "~/components/home/ourProduct";
import Testimonials from "~/components/home/testimonials";
import Articles from "~/components/home/articles";
import supabase from "~/utils/supabase";
import type {
  HomeBenefitFeatureType,
  HomeOurProductStatType,
  HomeTestimonialListType,
} from "~/types/homeType";
import type { IntroType } from "~/types/introType";
import type { ProductListType } from "~/types/productsType";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lalasia" },
    { name: "description", content: "Lalasia Home Page" },
  ];
}

export async function loader() {
  let { data: home_intro }: { data: IntroType | null } = await supabase
    .from("home_intro")
    .select("*")
    .eq("id", 1)
    .single();

  let { data: home_benefit_intro }: { data: IntroType | null } = await supabase
    .from("home_benefit_intro")
    .select("*")
    .eq("id", 1)
    .single();

  let {
    data: home_benefit_feature,
  }: { data: HomeBenefitFeatureType[] | null } = await supabase
    .from("home_benefit_feature")
    .select("*");

  let { data: home_product_intro }: { data: IntroType | null } = await supabase
    .from("home_product_intro")
    .select("*")
    .eq("id", 1)
    .single();

  let { data: home_product_list }: { data: ProductListType[] | null } =
    await supabase.from("product_list").select("*").range(0, 9);

  let { data: home_our_product_intro }: { data: IntroType | null } =
    await supabase
      .from("home_our_product_intro")
      .select("*")
      .eq("id", 1)
      .single();

  let {
    data: home_our_product_stat,
  }: { data: HomeOurProductStatType[] | null } = await supabase
    .from("home_our_product_stat")
    .select("*");

  let { data: home_testimonial_intro }: { data: IntroType | null } =
    await supabase
      .from("home_testimonial_intro")
      .select("*")
      .eq("id", 1)
      .single();

  let {
    data: home_testimonial_list,
  }: { data: HomeTestimonialListType[] | null } = await supabase
    .from("home_testimonial_list")
    .select("*");

  let { data: home_article_intro }: { data: IntroType | null } = await supabase
    .from("home_article_intro")
    .select("*")
    .eq("id", 1)
    .single();

  return {
    home_intro,
    home_benefit_intro,
    home_benefit_feature,
    home_product_intro,
    home_product_list,
    home_our_product_intro,
    home_our_product_stat,
    home_testimonial_intro,
    home_testimonial_list,
    home_article_intro,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {
    home_intro,
    home_benefit_intro,
    home_benefit_feature,
    home_product_intro,
    home_product_list,
    home_our_product_intro,
    home_our_product_stat,
    home_testimonial_intro,
    home_testimonial_list,
    home_article_intro,
  } = loaderData;

  return (
    <>
      <Header data={home_intro!} />
      <Benefits
        data={{ intro: home_benefit_intro!, features: home_benefit_feature! }}
      />
      <Product
        data={{ intro: home_product_intro!, productsList: home_product_list! }}
      />
      <OurProduct
        data={{ intro: home_our_product_intro!, stats: home_our_product_stat! }}
      />
      <Testimonials
        data={{
          intro: home_testimonial_intro!,
          testimonialList: home_testimonial_list!,
        }}
      />
      {/* <Articles data={HomeContent.articles} /> */}
    </>
  );
}
