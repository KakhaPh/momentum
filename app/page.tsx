import { FilterProvider } from "@/components/context/FilterContext";
import Filter from "@/components/filter/Filter";
import Statuses from "@/components/statuses/Statuses";

export default function Home() {
  return (
    <>
      <h1 className="font-firago font-semibold text-[34px] leading-none tracking-normal h-[41px] pt-3 pb-[90px] text-headlines">დავალებების გვერდი</h1>
      <FilterProvider>
        <Filter />
      </FilterProvider>
      <Statuses />
    </>
  );
}
