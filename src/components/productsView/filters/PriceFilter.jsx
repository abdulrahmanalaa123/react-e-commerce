import { useSearchQueries } from "../../../hooks/searchQueries";
import NamedBoxCheckBox from "../checkBoxes/NamedBoxCheckBox";
import FilterTitle from "./FilterTitle";
const availablePriceRanges = [
  "0-100",
  "100-200",
  "200-300",
  "300-400",
  "400-500",
];
function PriceFilter() {
  const { queryObj, editSearchParamsCheckBoxFunction } = useSearchQueries();

  return (
    <div id="price-filter" className="w-full mb-5 pl-1">
      <FilterTitle title={"Price Filter"}></FilterTitle>
      <div className="flex flex-wrap gap-4">
        {availablePriceRanges.map((range) => (
          <NamedBoxCheckBox
            paramKey={"priceRange"}
            key={`queryObj${range}`}
            name={`${range}$`}
            state={queryObj["priceRange"]?.includes(`${range}$`)}
            editSearchParams={editSearchParamsCheckBoxFunction}
          ></NamedBoxCheckBox>
        ))}
      </div>
    </div>
  );
}

export default PriceFilter;
