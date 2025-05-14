import type {
  AboutTeamIntroType,
  AboutTeamMemberType,
} from "~/types/aboutType";
import DescriptionHeader from "~/ui/sectionHeader/descriptionHeader";
import EyebrowHeader from "~/ui/sectionHeader/eyebrowHeader";
import TitleHeader from "~/ui/sectionHeader/titleHeader";

interface OurTeamProps {
  aboutTeamIntro: AboutTeamIntroType;
  aboutTeamMembers: AboutTeamMemberType[];
}

export default function OurTeam({
  aboutTeamIntro,
  aboutTeamMembers,
}: OurTeamProps) {
  return (
    <div className="mt-10 lg:mt-40">
      <div className="flex flex-col lg:gap-2">
        <EyebrowHeader text={aboutTeamIntro.title} />
        <div className="flex flex-col md:flex-row md:justify-between">
          <TitleHeader text={aboutTeamIntro.title} />
          <DescriptionHeader text={aboutTeamIntro.description} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:mt-10 lg:gap-8">
        {aboutTeamMembers.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <img src={item.image} alt="" className="h-70 rounded lg:h-80" />
            <b className="text-sm lg:text-[26px] lg:mt-1">{item.name}</b>
            <p className="text-xs text-paragraphColor lg:text-base">
              {item.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
