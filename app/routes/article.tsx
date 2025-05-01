import LatestArticles from "~/components/article/latestArticles";
import HeroSlider from "~/components/article/heroSlider";
import TrendingTopics from "~/components/article/trendingTopics";
import PageTitle from "~/ui/pageTitle";
import type { Route } from "./+types/article";
import supabase from "~/utils/supabase";
import type { IntroType } from "~/types/introType";
import type { ArticleCategoryType, ArticleListType } from "~/types/articleType";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Article" },
    { name: "description", content: "Lalasia Article Page" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const categoryId = params.categoryId;

  let { data: article_intro }: { data: IntroType | null } = await supabase
    .from("article_intro")
    .select("*")
    .eq("id", 1)
    .single();

  let { data: article_category }: { data: ArticleCategoryType[] | null } =
    await supabase.from("article_category").select("*");

  let { data: articleـheroـslider }: { data: ArticleListType[] | null } =
    await supabase.from("article_list").select("*").limit(2);

  let { data: article_latest_intro }: { data: IntroType | null } =
    await supabase
      .from("article_latest_intro")
      .select("*")
      .eq("id", 1)
      .single();

  let { data: latest_articles }: { data: ArticleListType[] | null } =
    await supabase
      .from("article_list")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2);

  let query = supabase.from("article_list").select("*");

  if (categoryId) {
    query = query.eq("category", Number(categoryId));
  }

  const { data: trending_articles }: { data: ArticleListType[] | null } =
    await query;

  return {
    article_intro,
    article_category,
    articleـheroـslider,
    article_latest_intro,
    latest_articles,
    trending_articles,
  };
}

export default function Article({ loaderData }: Route.ComponentProps) {
  const {
    article_intro,
    article_category,
    articleـheroـslider,
    article_latest_intro,
    latest_articles,
    trending_articles,
  } = loaderData;

  const getArticleCategory = async (categoryId: number) => {
    const found = article_category?.find((item) => item.id === categoryId);
    return found?.category;
  };

  return (
    <div>
      <PageTitle
        title={article_intro?.title!}
        description={article_intro?.description!}
      />
      <HeroSlider
        data={articleـheroـslider!}
        getArticleCategory={getArticleCategory}
      />
      <LatestArticles
        data={{
          intro: article_latest_intro!,
          latestArticles: latest_articles!,
        }}
        getArticleCategory={getArticleCategory}
      />
      <TrendingTopics
        data={{
          articleCategory: article_category!,
          trendingArticles: trending_articles!,
        }}
        getArticleCategory={getArticleCategory}
      />
    </div>
  );
}
