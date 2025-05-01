import useEmblaCarousel from "embla-carousel-react";
import type { HomeTestimonialListType } from "~/types/homeType";
import type { IntroType } from "~/types/introType";
import DescriptionHeader from "~/ui/sectionHeader/descriptionHeader";
import EyebrowHeader from "~/ui/sectionHeader/eyebrowHeader";
import TitleHeader from "~/ui/sectionHeader/titleHeader";

interface TestimonialsProps {
  data: { intro: IntroType; testimonialList: HomeTestimonialListType[] };
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <div className="w-full flex flex-col px-3 mt-10 md:px-6 lg:p-8">
      <div className="flex flex-col lg:gap-2 items-center">
        <EyebrowHeader text="Testimonials" />
        <div className="gap-2 items-center flex flex-col lg:gap-3">
          <TitleHeader text={data.intro.title!} />
          <DescriptionHeader
            text={data.intro.description!}
            className="md:text-center"
          />
        </div>
      </div>

      <div className="overflow-hidden mt-6 lg:mt-10" ref={emblaRef}>
        <div className="flex gap-6">
          {data.testimonialList.map((item) => (
            <div
              key={item.id}
              className="flex-[0_0_85%] bg-white flex flex-col gap-4 border border-gray-100 p-2 rounded pb-3 md:flex-[0_0_50%] lg:gap-5 lg:flex-[0_0_40%] lg:p-3"
            >
              <img
                src="/icons/quote-up.svg"
                alt=""
                className="size-8 lg:size-10"
              />
              <p className="text-sm text-paragraphColor lg:text-lg">
                {item.content}
              </p>
              <div className="w-full flex justify-between">
                <div className="flex gap-3 items-center">
                  <img
                    src={item.author_image}
                    alt=""
                    className="rounded-full lg:size-12"
                  />
                  <b className="text-sm lg:text-xl">{item.author_name}</b>
                </div>

                <div className="flex items-center gap-2">
                  <img src="/icons/star.svg" alt="" className="size-6" />
                  <b className="text-sm lg:text-lg">{item.rating}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
