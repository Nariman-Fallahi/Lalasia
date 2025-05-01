import DescriptionHeader from "~/ui/sectionHeader/descriptionHeader";
import EyebrowHeader from "~/ui/sectionHeader/eyebrowHeader";
import TitleHeader from "~/ui/sectionHeader/titleHeader";

export default function Articles({
  data,
}: {
  data: { title: string; description: string };
}) {
  return (
    <div className="w-full flex flex-col px-3 mt-10 md:px-6 lg:p-8 md:flex-row md:gap-5 lg:gap-10">
      <div className="w-full flex flex-col md:w-[80%]">
        <div className="flex flex-col lg:gap-2">
          <EyebrowHeader text="Articles" />
          <div className="gap-2 flex flex-col lg:gap-3">
            <TitleHeader text={data.title} />
            <DescriptionHeader text={data.description} />
          </div>
        </div>

        <div
          style={{ backgroundImage: 'url("/image/Rectangle 8.png")' }}
          className="w-full mt-6 rounded p-3 flex flex-col gap-3 text-white bg-cover bg-center"
        >
          <b className="text-xs mt-14 lg:text-lg">Tips and Trick</b>
          <b className="lg:text-[26px]">Create Cozy Dinning Room Vibes</b>
          <p className="text-sm text-gray-200 line-clamp-1 font-medium lg:text-lg">
            Decorating with neutrals brings balance to the dining room. With
            eclectic decoration on the sides, Caruso Dining Table and Cyrillo
            Dining Chairs elevate the tonal base of the room. The modern
            furniture set gives personality to any space in all types of
            architecture.‎ The wide volume enables everyone to sit back and
            relax, be it in the dining room, conference, or office.
          </p>
          <button className="font-bold text-xs text-start lg:text-lg">
            Read More
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col md:w-[70%]">
        {/* start */}
        <div className="w-full flex gap-3 mt-6 items-center lg:mt-0 lg:gap-6">
          <img
            src="/image/Rectangle 8.png"
            alt=""
            className="h-full w-1/3 lg:w-[45%]"
          />
          <div className="flex flex-col gap-2">
            <b className="text-xs lg:text-lg">Tips and Trick</b>
            <b className="lg:text-2xl">
              6 ways to give your home minimalistic vibes
            </b>
            <p className="hidden lg:block text-lg text-paragraphColor">
              Pellentesque etiam blandit in tincidunt at donec. Eget ipsum .
            </p>
            <div className="flex gap-3 mt-2 items-center">
              <img
                src="/image/Rectangle 8.png"
                alt=""
                className="size-[18px] rounded-full lg:size-[28px]"
              />
              <b className="text-xs lg:text-sm">By Jerremy Jean</b>
            </div>
          </div>
        </div>
        {/* end */}
      </div>
    </div>
  );
}
