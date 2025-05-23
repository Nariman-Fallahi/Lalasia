export type ArticleListType = {
  id: number ;
  created_at: string;
  image: string;
  category: string | undefined;
  title: string;
  author_name: string;
  author_avatar: string;
  description: string;
};

export type ArticleCategoryType = {
  id: number;
  category: string;
};
