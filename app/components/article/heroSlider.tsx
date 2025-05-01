import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type { ArticleListType } from "~/types/articleType";
import ArticleInfo from "~/ui/articleInfo";
import { formatDateReadable } from "~/utils/formatDateReadable";


interface HeroSliderProps {
  data: ArticleListType[];
  getArticleCategory: (categoryId: number) => Promise<string | undefined>;
}

export default function HeroSlider({
  data,
  getArticleCategory,
}: HeroSliderProps) {
  const autoplay = Autoplay({ delay: 6000, stopOnInteraction: false });
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay]);

  return (
    <div className="w-full overflow-hidden mt-6" ref={emblaRef}>
      <div className="flex gap-6">
        {data.map(async (item) => (
          <div key={item.id} className="w-full flex-[0_0_100%]">
            <img
              src={item.image}
              alt="Hero slider Image"
              className="w-full aspect-video object-cover md:h-80 lg:h-100"
            />
            <div className="w-full px-6 flex flex-col gap-2 mt-[-4rem]">
              <div className="bg-white p-4 rounded w-[90%] mx-auto flex flex-col gap-2 lg:p-6">
                <ArticleInfo
                  category={(await getArticleCategory(item.category)) || ""}
                  title={item.title}
                  author={{
                    avatar: item.author_avatar,
                    name: `By ${item.author_name}`,
                    date: formatDateReadable(item.created_at),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
