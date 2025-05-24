import OurMission from "~/components/about-page/ourMission";
import OurTeam from "~/components/about-page/ourTeam";
import CustomVideoPlayer from "~/components/customVideoPlayer";
import PageTitle from "~/ui/pageTitle";
import type { Route } from "./+types/about";
import { createClient } from "~/utils/supabase/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Lalasia About Page" },
  ];
}

export async function loader() {
  const supabase = createClient();

  const { data: aboutIntro } = await supabase
    .from("about_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: aboutMissionIntro } = await supabase
    .from("about_mission_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: aboutMissionStat } = await supabase
    .from("about_mission_stat")
    .select("*");

  const { data: aboutMissionFeature } = await supabase
    .from("about_mission_feature")
    .select("*");

  const { data: aboutTeamIntro } = await supabase
    .from("about_team_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: aboutTeamMember } = await supabase
    .from("about_team_member")
    .select("*");

  return {
    aboutIntro,
    aboutMissionIntro,
    aboutMissionStat,
    aboutMissionFeature,
    aboutTeamIntro,
    aboutTeamMember,
  };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const {
    aboutIntro,
    aboutMissionIntro,
    aboutMissionStat,
    aboutMissionFeature,
    aboutTeamIntro,
    aboutTeamMember,
  } = loaderData;

  return (
    <div className="px-3 md:px-6 lg:p-8">
      <PageTitle
        title={aboutIntro?.title!}
        description={aboutIntro?.description!}
      />

      <div className="mt-6">
        <CustomVideoPlayer video_URL={aboutIntro?.video!} />
      </div>

      <OurMission
        aboutMissionIntro={aboutMissionIntro!}
        aboutMissionFeatures={aboutMissionFeature!}
        aboutMissionStats={aboutMissionStat!}
      />

      <OurTeam
        aboutTeamIntro={aboutTeamIntro!}
        aboutTeamMembers={aboutTeamMember!}
      />
    </div>
  );
}
