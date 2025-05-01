import type { HomeBenefitFeatureType } from "~/types/homeType";
import type { IntroType } from "~/types/introType";
import DescriptionHeader from "~/ui/sectionHeader/descriptionHeader";
import EyebrowHeader from "~/ui/sectionHeader/eyebrowHeader";
import TitleHeader from "~/ui/sectionHeader/titleHeader";

interface BenefitsProps {
  data: { intro: IntroType; features: HomeBenefitFeatureType[] };
}

export default function Benefits({ data }: BenefitsProps) {
  return (
    <div className="w-full flex flex-col px-3 mt-10 md:px-6 lg:p-8">
      <div className="flex flex-col md:gap-2">
        <EyebrowHeader text="Benefits" />
        <div className="flex flex-col md:flex-row md:justify-between">
          <TitleHeader text={data.intro.title!} />
          <DescriptionHeader text={data.intro.description!} />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 mt-6 gap-5 md:grid-cols-3 md:mt-8 lg:gap-7 lg:mt-10">
        {data.features.map((item) => (
          <div
            key={item.id}
            className="p-3 flex flex-col gap-3 bg-white rounded lg:gap-4"
          >
            <img src={item.icon} alt="" className="size-10 lg:size-14" />
            <b className="lg:text-2xl">{item.title}</b>
            <p className="text-paragraphColor text-sm lg:text-lg">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
