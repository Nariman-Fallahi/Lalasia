import Header from "~/components/services/header";
import Portofolio from "~/components/services/portofolio";
import ServiceList from "~/components/services/serviceList";
import type { Route } from "./+types/services";
import supabase from "~/utils/supabase";
import type { IntroType } from "~/types/introType";
import type {
  ServiceDataType,
  ServicePortfolioFeatureType,
} from "~/types/servicesType";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services" },
    { name: "description", content: "Lalasia Services Page" },
  ];
}

export async function loader() {
  let { data: service_intro }: { data: IntroType | null } = await supabase
    .from("service_intro")
    .select("*")
    .eq("id", 1)
    .single();

  let { data: service_feature }: { data: ServiceDataType[] | null } =
    await supabase.from("service_feature").select("*");

  let { data: service_portfolio_intro }: { data: IntroType | null } =
    await supabase
      .from("service_portfolio_intro")
      .select("*")
      .eq("id", 1)
      .single();

  let {
    data: service_portfolio_feature,
  }: { data: ServicePortfolioFeatureType[] | null } = await supabase
    .from("service_portfolio_feature")
    .select("*");

  return {
    service_intro,
    service_feature,
    service_portfolio_intro,
    service_portfolio_feature,
  };
}

export default function Services({ loaderData }: Route.ComponentProps) {
  const {
    service_intro,
    service_feature,
    service_portfolio_intro,
    service_portfolio_feature,
  } = loaderData;

  return (
    <div className="px-3 md:px-6 lg:p-8">
      <Header data={service_intro!} />
      <ServiceList data={service_feature!} />
      <Portofolio
        data={{
          intro: service_portfolio_intro!,
          features: service_portfolio_feature!,
        }}
      />
    </div>
  );
}
