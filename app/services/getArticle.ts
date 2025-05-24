import type { ArticleCategoryType, ArticleListType } from "~/types/articleType";
import { createClient } from "~/utils/supabase/client";

const getArticleCategory = async (categoryId: string) => {
  const supabase = createClient();
  let { data: article_category }: { data: ArticleCategoryType[] | null } =
    await supabase.from("article_category").select("*");

  const found = article_category?.find(
    (item) => item.id === Number(categoryId)
  );
  return found?.category;
};

export const getArticlesWithCategory = async (data: ArticleListType[]) => {
  return await Promise.all(
    data.map(async (article) => {
      const category = await getArticleCategory(article.category!);
      return {
        ...article,
        category,
      };
    })
  );
};
