import type { HomeOurProductStatType } from "~/types/homeType";
import type { IntroType } from "~/types/introType";
import DescriptionHeader from "~/ui/sectionHeader/descriptionHeader";
import EyebrowHeader from "~/ui/sectionHeader/eyebrowHeader";
import TitleHeader from "~/ui/sectionHeader/titleHeader";
import StatsSection from "~/ui/statsSection";

interface OurProductProps {
  data: {
    intro: IntroType;
    stats: HomeOurProductStatType[];
  };
}

export default function OurProduct({ data }: OurProductProps) {
  return (
    <div className="w-full flex flex-col justify-between px-3 mt-10 md:px-6 lg:p-8 lg:flex-row lg:gap-30">
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex flex-col gap-2 lg:gap-3">
          <EyebrowHeader text="Our Product" />
          <TitleHeader text={data.intro.title!} />
          <DescriptionHeader text={data.intro.description!} />
        </div>

        <button className="mt-6 w-full text-white p-2 rounded text-sm bg-main md:w-1/2 lg:w-1/3 cursor-pointer hover:bg-cyan-800 transition-all decoration-300">
          Learn More
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 mt-6 place-items-center md:mt-10">
          {data.stats.map((data) => (
            <StatsSection data={data} key={data.id} />
          ))}
        </div>

        <img
          src={data.intro.image}
          alt=""
          className="mt-4 rounded scale-90 lg:scale-100 lg:mt-8"
        />
      </div>
    </div>
  );
}
