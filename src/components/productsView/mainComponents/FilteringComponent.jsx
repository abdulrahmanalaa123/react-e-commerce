import { createSearchParams, useSearchParams } from "react-router-dom";
import filterSVG from "../../../assets/svgs/filter.svg";
import ColorCheckBox from "../checkBoxes/ColorCheckBox";
import NamedBoxCheckBox from "../checkBoxes/NamedBoxCheckBox";
import SubCategoryCheckBox from "../checkBoxes/SubCategoryCheckBox";
import queryDecoder from "../../../utils/queryDecoder";

const availableFilters = {
  Color: ["Beige", "Red", "Yellow", "Green", "Blue", "Purple"],
  Size: ["Small", "Medium", "Large", "XLarge"],
  SubCategories: ["Trees", "Indoor Plants", "Fruit Trees", "Vegetables"],
};

function FilteringComponent() {
  let [searchParams, setSearchParams] = useSearchParams();
  // its handled with two because of using the built in target checker instead of passing the paramKey and values to the param and using one on change function
  // and needing to use event
  // on second thoughts its better this way

  function editSearchParams(event, paramKey, name) {
    if (event.target.checked) {
      const finalParam = { ...searchParams };
      finalParam[paramKey] = name;
      setSearchParams(createSearchParams(finalParam));
      console.log("added", paramKey, name);
    } else {
      const finalParam = queryDecoder(searchParams);
      delete finalParam[paramKey];
      setSearchParams(createSearchParams(finalParam));
      console.log("removed", paramKey, name);
    }
  }
  return (
    <section
      id="filters"
      className="flex flex-col w-[256px] items-center mt-[46px]"
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="font-medium text-md ">Filter</span>
        <img src={filterSVG} alt="filter-icon" className="w-5 h-4" />
      </div>
      <div id="category-filter" className="w-full mb-5">
        <div className="mb-9">
          <p className="font-medium text-md text-center ">Categories</p>
          <div className="w-full h-[2px] bg-black mt-2"></div>
        </div>
        <div className="flex flex-col gap-9">
          {availableFilters["SubCategories"].map((value) => {
            return (
              <SubCategoryCheckBox
                paramKey={"SubCategories"}
                name={value}
                editSearchParams={editSearchParams}
              ></SubCategoryCheckBox>
            );
          })}
        </div>
      </div>
      <div id="color-filter" className="w-full mb-5">
        <div className="mb-9">
          <p className="font-medium text-md text-center ">Color Options</p>
          <div className="w-full h-[2px] bg-black mt-2"></div>
        </div>
        <div className="flex place-content-center gap-4">
          {availableFilters["Color"].map((value) => {
            return (
              <ColorCheckBox
                paramKey={"Color"}
                name={value}
                editSearchParams={editSearchParams}
              ></ColorCheckBox>
            );
          })}
        </div>
      </div>
      <div id="size-filter" className="w-full mb-5">
        <div className="mb-9">
          <p className="font-medium text-md text-center ">Size</p>
          <div className="w-full h-[2px] bg-black mt-2"></div>
        </div>
        <div className="flex flex-wrap gap-4">
          {availableFilters["Size"].map((value) => {
            return (
              <NamedBoxCheckBox
                paramKey={"Size"}
                name={value}
                editSearchParams={editSearchParams}
              ></NamedBoxCheckBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FilteringComponent;
