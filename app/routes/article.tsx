import LatestArticles from "~/components/article-page/latestArticles";
import HeroSlider from "~/components/article-page/heroSlider";
import TrendingTopics from "~/components/article-page/trendingTopics";
import PageTitle from "~/ui/pageTitle";
import type { Route } from "./+types/article";
import supabase from "~/utils/supabase";
import type { IntroType } from "~/types/introType";
import type { ArticleCategoryType, ArticleListType } from "~/types/articleType";
import { getArticlesWithCategory } from "~/services/getArticle";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Article" },
    { name: "description", content: "Lalasia Article Page" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const categoryId = params.categoryId;

  const { data: articleIntro }: { data: IntroType | null } = await supabase
    .from("article_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: articleCategory }: { data: ArticleCategoryType[] | null } =
    await supabase.from("article_category").select("*");

  const { data: articleHeroSlider }: { data: ArticleListType[] | null } =
    await supabase.from("article_list").select("*").limit(2);

  const processedArticleHeroSlider = await getArticlesWithCategory(
    articleHeroSlider!
  );

  const { data: articleLatestIntro }: { data: IntroType | null } =
    await supabase
      .from("article_latest_intro")
      .select("*")
      .eq("id", 1)
      .single();

  const { data: latestArticles }: { data: ArticleListType[] | null } =
    await supabase
      .from("article_list")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2);

  const processedLatestArticles = await getArticlesWithCategory(
    latestArticles!
  );

  let query = supabase.from("article_list").select("*");

  if (categoryId) {
    query = query.eq("category", Number(categoryId));
  }

  const { data: trendingArticles }: { data: ArticleListType[] | null } =
    await query;

  const processedTrendingArticles = await getArticlesWithCategory(
    trendingArticles!
  );

  return {
    articleIntro,
    articleCategory,
    processedArticleHeroSlider,
    articleLatestIntro,
    processedLatestArticles,
    processedTrendingArticles,
  };
}

export default function Article({ loaderData }: Route.ComponentProps) {
  const {
    articleIntro,
    processedArticleHeroSlider,
    articleLatestIntro,
    processedLatestArticles,
    articleCategory,
    processedTrendingArticles,
  } = loaderData;

  return (
    <div>
      <PageTitle
        title={articleIntro?.title!}
        description={articleIntro?.description!}
      />
      <HeroSlider data={processedArticleHeroSlider!} />
      <LatestArticles
        data={{
          intro: articleLatestIntro!,
          latestArticles: processedLatestArticles!,
        }}
      />
      <TrendingTopics
        data={{
          articleCategory: articleCategory!,
          trendingArticles: processedTrendingArticles!,
        }}
      />
    </div>
  );
}
