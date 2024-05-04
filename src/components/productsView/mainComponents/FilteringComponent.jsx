import filterSVG from "../../../assets/svgs/filter.svg";
import ColorCheckBox from "../checkBoxes/ColorCheckBox";
import NamedBoxCheckBox from "../checkBoxes/NamedBoxCheckBox";
import SubCategoryCheckBox from "../checkBoxes/SubCategoryCheckBox";
import { useSearchQueries } from "../../../hooks/searchQueries";

const availableFilters = {
  Color: ["Beige", "Red", "Yellow", "Green", "Blue", "Purple"],
  Size: ["Small", "Medium", "Large", "XLarge"],
  SubCategories: ["Trees", "Indoor Plants", "Fruit Trees", "Vegetables"],
};

function FilteringComponent() {
  const { addQueryKey, removeQueryKey, getQueryObject } = useSearchQueries();
  // its handled with two because of using the built in target checker instead of passing the paramKey and values to the param and using one on change function
  // and needing to use event
  // on second thoughts its better this way
  console.log("rerender");
  const queryObject = getQueryObject();
  function editSearchParams(event, paramKey, val) {
    if (event.target.checked) {
      addQueryKey(paramKey, val);
      console.log("added", paramKey, val);
    } else {
      removeQueryKey(paramKey, val);
      console.log("removed", paramKey, val);
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
                key={`SubCategories___${value}`}
                name={value}
                editSearchParams={editSearchParams}
                state={queryObject["SubCategories"]?.includes(value)}
                // initialCheck={queryObject["SubCategories"]?.includes(value)}
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
                // 3 underscores used because naming of the element ids inside is with a dash
                // so no confusion happens if it can even happen that ids can interefere with component keys in react while i think it doesnt
                key={`Color___${value}`}
                name={value}
                editSearchParams={editSearchParams}
                state={queryObject["Color"]?.includes(value)}
                // initialCheck={queryObject["Color"]?.includes(value)}
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
                key={`Size___${value}`}
                name={value}
                state={queryObject["Size"]?.includes(value)}
                editSearchParams={editSearchParams}
                // initialCheck={queryObject["Size"]?.includes(value)}
              ></NamedBoxCheckBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FilteringComponent;
