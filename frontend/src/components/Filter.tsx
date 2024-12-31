import { SlidersHorizontal, ReplaceAll, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [filter, setFilter] = useState<boolean>(false);
  const [searchParams, setSearchParamas] = useSearchParams();

  function handleClick(value: string) {
    searchParams.set("filter", value);
    setSearchParamas(searchParams);
  }

  const currentFilter = searchParams.get("filter") || "all";

  return (
    <div className="relative" onClick={() => setFilter(!filter)}>
      <Button
        startIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
        className="text-sm"
        variant="secondary"
        text="Filters"
      />
      {filter && (
        <div className="absolute top-10 z-50 bg-white w-32 min-h-32 p-1.5 rounded-lg">
          <Button
            onClick={() => handleClick("all")}
            startIcon={<ReplaceAll size={16} />}
            text="All"
            variant="primary"
            className={`border-transparent hover:bg-neutral-200 active:bg-neutral-200 bg-white px-4 py-2 hover:text-gray-900 w-full text-sm tracking-wider text-gray-700
                 ${currentFilter === "all" && "bg-neutral-300"}`}
          />

          <Button
            onClick={() => handleClick("twitter")}
            startIcon={<Twitter size={16} />}
            text="Twitter"
            variant="primary"
            className={`border-transparent hover:bg-neutral-200 active:bg-neutral-200 bg-white px-4 py-2 hover:text-gray-900 w-full text-sm tracking-wider text-gray-700
                ${currentFilter === "twitter" && "bg-neutral-300"}`}
          />
          <Button
            onClick={() => handleClick("youtube")}
            startIcon={<Youtube size={16} />}
            text="Youtube"
            variant="primary"
            className={`border-transparent hover:bg-neutral-200 active:bg-neutral-200 bg-white px-4 py-2 hover:text-gray-900 w-full text-sm tracking-wider text-gray-700
                ${currentFilter === "youtube" && "bg-neutral-300"}`}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
