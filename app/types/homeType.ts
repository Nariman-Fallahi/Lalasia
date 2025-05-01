export type HomeBenefitFeatureType = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type HomeOurProductStatType = {
  id: number;
  value: string;
  label: string;
};

export type HomeTestimonialListType = {
  id: number;
  author_name: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  author_image: string;
};
