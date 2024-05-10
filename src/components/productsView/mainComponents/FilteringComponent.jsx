import filterSVG from "../../../assets/svgs/filter.svg";
import { useSearchQueries } from "../../../hooks/searchQueries";
import VariationOptionsFilter from "../filters/VariationOptionsFilter";
import SubcategoryFilter from "../filters/SubcategoryFilter";
import PriceFilter from "../filters/PriceFilter";
//instead of changign the state from being local to the checkbox to be stored in the searchURL which is more consistent and better in every measure
// but a neat trick is using the initialCheck which was the old way and editing the key of each component to be `SubCategories___${value}___${queryObject.length != 0}`
// and it wouldve fixed the issue of navigating to the plants page and not changing the state even tho its not in the searchParams but this is a trick i thought worth to write
// but not a good solution in any shape or form
function FilteringComponent() {
  const { getQueryObject, clearQueries } = useSearchQueries();

  const queryObject = getQueryObject();

  return (
    <section
      id="filters"
      className="flex flex-col w-64 items-center mt-[2.875rem] overflow-y-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="font-medium text-md ">Filter</span>
        <img src={filterSVG} alt="filter-icon" className="w-5 h-4" />
      </div>
      <SubcategoryFilter></SubcategoryFilter>
      <VariationOptionsFilter></VariationOptionsFilter>
      <PriceFilter></PriceFilter>
      {Object.keys(queryObject).filter((key) => key !== "pageNo").length !=
        0 && (
        <button
          className="mb-4  mx-auto border-[0.5px] border-black w-full py-1 rounded-sm text-text-300"
          onClick={clearQueries}
        >
          Clear All
        </button>
      )}
    </section>
  );
}

export default FilteringComponent;
