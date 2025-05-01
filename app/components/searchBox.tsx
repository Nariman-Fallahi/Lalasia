import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function SearchBox() {
  const [value, setValue] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setValue(search);
    }
  }, []);

  const handlelSetSearchParams = () => {
    setSearchParams({ search: value || "" });
  };

  return (
    <div className="w-full flex p-1 items-center gap-3 justify-between border border-gray-200 rounded-sm lg:p-2 bg-gray-100">
      <Search className="text-paragraphColor" />
      <input
        type="text"
        placeholder="Search property"
        className="outline-none text-sm flex-grow lg:text-base"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={(e) => e.key === "Enter" && handlelSetSearchParams()}
      />
      <button
        onClick={() => handlelSetSearchParams()}
        className="p-2 bg-[#518581] text-white text-sm rounded-sm lg:w-[20%] cursor-pointer hover:bg-[#406b68] transition-all duration-300 lg:text-base"
      >
        Search
      </button>
    </div>
  );
}
