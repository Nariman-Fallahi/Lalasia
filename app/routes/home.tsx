import Header from "~/components/home-page/header";
import type { Route } from "./+types/home";
import Benefits from "~/components/home-page/benefits";
import Product from "~/components/home-page/product";
import OurProduct from "~/components/home-page/ourProduct";
import Testimonials from "~/components/home-page/testimonials";
import Articles from "~/components/home-page/articles";
import { getArticlesWithCategory } from "~/services/getArticle";
import { createClient } from "~/utils/supabase/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lalasia" },
    { name: "description", content: "Lalasia Home Page" },
  ];
}

export async function loader() {
  const supabase = createClient();

  const { data: homeIntro } = await supabase
    .from("home_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: homeBenefitIntro } = await supabase
    .from("home_benefit_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: homeBenefitFeature } = await supabase
    .from("home_benefit_feature")
    .select("*");

  const { data: homeProductIntro } = await supabase
    .from("home_product_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: homeProductList } = await supabase
    .from("product_list")
    .select("*")
    .range(0, 9);

  const { data: homeOurProductIntro } = await supabase
    .from("home_our_product_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: homeOurProductStat } = await supabase
    .from("home_our_product_stat")
    .select("*");

  const { data: homeTestimonialIntro } = await supabase
    .from("home_testimonial_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: homeTestimonialList } = await supabase
    .from("home_testimonial_list")
    .select("*");

  const { data: homeArticleIntro } = await supabase
    .from("home_article_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: articles } = await supabase
    .from("article_list")
    .select("*")
    .limit(3);

  const homeArticles = await getArticlesWithCategory(articles!);

  const { data: latestArticle } = await supabase
    .from("article_list")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const homeLatestArticle = await getArticlesWithCategory(latestArticle!);

  return {
    homeIntro,
    homeBenefitIntro,
    homeBenefitFeature,
    homeProductIntro,
    homeProductList,
    homeOurProductIntro,
    homeOurProductStat,
    homeTestimonialIntro,
    homeTestimonialList,
    homeArticleIntro,
    homeArticles,
    homeLatestArticle: homeLatestArticle[0],
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {
    homeIntro,
    homeBenefitIntro,
    homeBenefitFeature,
    homeProductIntro,
    homeProductList,
    homeOurProductIntro,
    homeOurProductStat,
    homeTestimonialIntro,
    homeTestimonialList,
    homeArticleIntro,
    homeArticles,
    homeLatestArticle,
  } = loaderData;

  return (
    <>
      <Header data={homeIntro!} />
      <Benefits
        data={{ intro: homeBenefitIntro!, features: homeBenefitFeature! }}
      />
      <Product
        data={{ intro: homeProductIntro!, productsList: homeProductList! }}
      />
      <OurProduct
        data={{ intro: homeOurProductIntro!, stats: homeOurProductStat! }}
      />
      <Testimonials
        data={{
          intro: homeTestimonialIntro!,
          testimonialList: homeTestimonialList!,
        }}
      />
      <Articles
        data={{
          intro: homeArticleIntro!,
          articlesData: homeArticles!,
          latestArticle: homeLatestArticle!,
        }}
      />
    </>
  );
}
