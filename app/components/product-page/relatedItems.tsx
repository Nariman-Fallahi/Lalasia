import type { ProductListType } from "~/types/productsType";
import ProductCard from "../productCard";

interface RelatedItemsProps {
  data: ProductListType[];
}

export default function RelatedItems({ data }: RelatedItemsProps) {
  return (
    <div className="mt-10 lg:mt-20">
      <b className="text-lg lg:text-[32px]">Related Items</b>
      <div className="grid grid-cols-2 mt-4 gap-3 md:grid-cols-3 lg:gap-6 lg:mt-6">
        {data.map((item) => (
          <ProductCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
