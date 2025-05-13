import type { ArticleListType } from "~/types/articleType";
import type { IntroType } from "~/types/introType";
import ArticleInfo from "~/ui/articleInfo";
import EyebrowHeader from "~/ui/sectionHeader/eyebrowHeader";
import TitleHeader from "~/ui/sectionHeader/titleHeader";
import { formatDateReadable } from "~/utils/formatDateReadable";
import { getArticleCategory } from "~/utils/getArticleCategory";

interface LatestArticlesProps {
  data: { intro: IntroType; latestArticles: ArticleListType[] };
}

export default function LatestArticles({ data }: LatestArticlesProps) {
  return (
    <div className="w-full flex flex-col px-3 mt-10 md:px-6 lg:p-8 gap-2">
      <EyebrowHeader text={data.intro.eyebrow!} />
      <TitleHeader text={data.intro.title!} />

      <div className="mt-3 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:mt-10 lg:gap-10">
        {data.latestArticles.map(async (item) => (
          <div className="flex flex-col gap-3">
            <img
              src={item.image}
              alt=""
              className="w-full h-50 object-center object-cover lg:h-80"
            />
            <ArticleInfo
              category={(await getArticleCategory(item.category)) || ""}
              title={item.title}
              description={item.description}
              author={{
                avatar: item.author_avatar,
                name: `By ${item.author_name}`,
                date: formatDateReadable(item.created_at),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
