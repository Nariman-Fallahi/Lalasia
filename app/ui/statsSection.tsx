export default function StatsSection({ data }: { data: StatsType }) {
  return (
    <div key={data.id} className="flex flex-col lg:gap-2">
      <b className="text-xl lg:text-5xl">{data.value}</b>
      <p className="text-sm text-paragraphColor lg:text-lg">{data.label}</p>
    </div>
  );
}
