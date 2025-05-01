export type ServiceDataType = {
  id: number;
  title: string;
  description: string;
};

export interface ServicePortfolioFeatureType extends ServiceDataType {
  image: string;
}
