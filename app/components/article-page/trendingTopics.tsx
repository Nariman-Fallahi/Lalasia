import useEmblaCarousel from "embla-carousel-react";
import { useSearchParams } from "react-router";
import type { ArticleCategoryType, ArticleListType } from "~/types/articleType";
import ArticleInfo from "~/ui/articleInfo";
import EyebrowHeader from "~/ui/sectionHeader/eyebrowHeader";
import TitleHeader from "~/ui/sectionHeader/titleHeader";

interface TrendingTopicsProps {
  data: {
    articleCategory: ArticleCategoryType[];
    trendingArticles: ArticleListType[];
  };
}

export default function TrendingTopics({ data }: TrendingTopicsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emblaRef] = useEmblaCarousel({ dragFree: true });
  const renderedCategories = [
    { id: 0, category: "All" },
    ...data.articleCategory,
  ];

  return (
    <div className="w-full flex flex-col px-3 mt-16 md:px-6 lg:p-8 gap-2">
      <EyebrowHeader text="Trending Topics" />
      <TitleHeader text="Popular last week" />

      <div className="w-full overflow-hidden mt-5 lg:mt-8" ref={emblaRef}>
        <div className="flex gap-6">
          {renderedCategories.map((item) => (
            <button
              key={item.id}
              onClick={() => setSearchParams({ categoryId: String(item.id) })}
              className={`flex-[0_0_40%] p-1 bg-gray-100 flex justify-center items-center rounded-full cursor-pointer md:flex-[0_0_15%] lg:text-lg
                 ${
                   Number(searchParams.get("categoryId")) === item.id &&
                   "bg-main text-white"
                 }`}
            >
              {item.category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 mt-10 gap-6 lg:gap-20">
        {data.trendingArticles.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center gap-4 lg:gap-8"
          >
            <img
              src={item.image}
              alt=""
              className="h-full w-[35%] lg:w-[25%] rounded"
            />
            <ArticleInfo
              category={item.category!}
              title={item.title}
              description={item.description}
              author={{
                avatar: item.author_avatar,
                name: `By ${item.author_name}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
