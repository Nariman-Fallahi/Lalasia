// Home
type FeatureType = {
  id: number;
  image: string;
  title: string;
  description: string;
};

type BenefitsType = {
  title: string;
  description: string;
  features: FeatureType[];
};

type StatsType = {
  id: number;
  label: string;
  value: string;
};

type OurProductType = {
  image: string;
  title: string;
  description: string;
  statsSection: StatsType[];
};

type ProductContentType = {
  title: string;
  description: string;
  productBanners: {
    id: number;
    image: string;
    title: string;
    description: string;
  }[];
};
// END Home
