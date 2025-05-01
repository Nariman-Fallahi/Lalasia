import useEmblaCarousel from "embla-carousel-react";
import type { IntroType } from "~/types/introType";
import type { ProductListType } from "~/types/productsType";
import DescriptionHeader from "~/ui/sectionHeader/descriptionHeader";
import EyebrowHeader from "~/ui/sectionHeader/eyebrowHeader";
import TitleHeader from "~/ui/sectionHeader/titleHeader";
import ProductCard from "../productCard";

interface ProductProps {
  data: { intro: IntroType; productsList: ProductListType[] };
}

export default function Product({ data }: ProductProps) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <div className="w-full flex flex-col items-center px-3 mt-10 md:px-6 lg:p-8">
      <div className="flex flex-col lg:gap-2 items-center">
        <EyebrowHeader text="Product" />
        <div className="gap-2 items-center flex flex-col lg:gap-3">
          <TitleHeader text={data.intro.title!} />
          <DescriptionHeader
            text={data.intro.description!}
            className="md:text-center"
          />
        </div>
      </div>

      <div className="w-full overflow-hidden mt-6" ref={emblaRef}>
        <div className="flex gap-6">
          {data.productsList.map((item) => (
            <div
              key={item.id}
              className="flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_30%]"
            >
              <ProductCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
