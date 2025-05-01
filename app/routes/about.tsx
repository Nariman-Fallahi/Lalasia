import OurMission from "~/components/about/ourMission";
import OurTeam from "~/components/about/ourTeam";
import CustomVideoPlayer from "~/components/customVideoPlayer";
import PageTitle from "~/ui/pageTitle";
import type { Route } from "./+types/about";
import supabase from "~/utils/supabase";
import type {
  AboutIntroType,
  AboutMissionFeatureType,
  AboutMissionStatType,
  AboutTeamMemberType,
} from "~/types/aboutType";
import type { IntroType } from "~/types/introType";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Lalasia About Page" },
  ];
}

export async function loader() {
  let { data: about_intro }: { data: AboutIntroType | null } = await supabase
    .from("about_intro")
    .select("*")
    .eq("id", 1)
    .single();

  let { data: about_mission_intro }: { data: IntroType | null } =
    await supabase.from("about_mission_intro").select("*").eq("id", 1).single();

  let { data: about_mission_stat }: { data: AboutMissionStatType[] | null } =
    await supabase.from("about_mission_stat").select("*");

  let {
    data: about_mission_feature,
  }: { data: AboutMissionFeatureType[] | null } = await supabase
    .from("about_mission_feature")
    .select("*");

  let { data: about_team_intro }: { data: IntroType | null } =
    await supabase.from("about_team_intro").select("*").eq("id", 1).single();

  let { data: about_team_member }: { data: AboutTeamMemberType[] | null } =
    await supabase.from("about_team_member").select("*");

  return {
    about_intro,
    about_mission_intro,
    about_mission_stat,
    about_mission_feature,
    about_team_intro,
    about_team_member,
  };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const {
    about_intro,
    about_mission_intro,
    about_mission_stat,
    about_mission_feature,
    about_team_intro,
    about_team_member,
  } = loaderData;
  return (
    <div className="px-3 md:px-6 lg:p-8">
      <PageTitle
        title={about_intro?.title!}
        description={about_intro?.description!}
      />

      <div className="mt-6">
        <CustomVideoPlayer video_URL={about_intro?.video!} />
      </div>

      <OurMission
        aboutMissionIntro={about_mission_intro!}
        aboutMissionFeatures={about_mission_feature!}
        aboutMissionStats={about_mission_stat!}
      />
      <OurTeam
        aboutTeamIntro={about_team_intro!}
        aboutTeamMembers={about_team_member!}
      />
    </div>
  );
}
