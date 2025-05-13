import type { ArticleCategoryType } from "~/types/articleType";
import supabase from "./supabase";

export const getArticleCategory = async (categoryId: number) => {
  let { data: article_category }: { data: ArticleCategoryType[] | null } =
    await supabase.from("article_category").select("*");

  const found = article_category?.find((item) => item.id === categoryId);
  return found?.category;
};
