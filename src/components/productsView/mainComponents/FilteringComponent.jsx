import filterSVG from "../../../assets/svgs/filter.svg";
import ColorCheckBox from "../checkBoxes/ColorCheckBox";
import NamedBoxCheckBox from "../checkBoxes/NamedBoxCheckBox";
import SubCategoryCheckBox from "../checkBoxes/SubCategoryCheckBox";
import { useSearchQueries } from "../../../hooks/searchQueries";

const availableFilters = {
  color: ["Beige", "Red", "Yellow", "Green", "Blue", "Purple"],
  size: ["Small", "Medium", "Large"],
  subcategory: ["Trees", "Indoor Plants", "Fruit Trees", "Vegetables"],
};

function FilteringComponent() {
  const { addQueryKey, removeQueryKey, getQueryObject, clearQueries } =
    useSearchQueries();
  // dont know if this is the best way to call the queryObject instead of adding it into some sort of useState inside the hook or sth but idk best way
  // i think
  const queryObject = getQueryObject();
  // its handled with two because of using the built in target checker instead of passing the paramKey and values to the param and using one on change function
  // and needing to use event
  // on second thoughts its better this way
  function editSearchParams(event, paramKey, val) {
    if (event.target.checked) {
      addQueryKey(paramKey, val);
    } else {
      removeQueryKey(paramKey, val);
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
          <p className="font-medium text-md text-center ">SubCategories</p>
          <div className="w-full h-[2px] bg-black mt-2"></div>
        </div>
        <div className="flex flex-col gap-9">
          {availableFilters["subcategory"].map((value) => {
            return (
              //instead of changign the state from being local to be stored in the searchURL is more consistent and better in every measure
              // but a neat trick is using the initialCheck which was the old way and editing the key of each component to be `SubCategories___${value}___${queryObject.length != 0}`
              // and it wouldve fixed the issue of navigating to the plants page and not changing the state even tho its not in the searchParams but this is a trick i thought worth to write
              // but not a good solution in any shape or form
              <SubCategoryCheckBox
                paramKey={"subcategory"}
                key={`subcategory___${value}`}
                name={value}
                editSearchParams={editSearchParams}
                state={queryObject["subcategory"]?.includes(value)}
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
          {availableFilters["color"].map((value) => {
            return (
              <ColorCheckBox
                paramKey={"color"}
                // 3 underscores used because naming of the element ids inside is with a dash
                // so no confusion happens if it can even happen that ids can interefere with component keys in react while i think it doesnt
                key={`color___${value}`}
                name={value}
                editSearchParams={editSearchParams}
                state={queryObject["color"]?.includes(value)}
              ></ColorCheckBox>
            );
          })}
        </div>
      </div>
      <div id="size-filter" className="w-full mb-6">
        <div className="mb-9">
          <p className="font-medium text-md text-center ">Size</p>
          <div className="w-full h-[2px] bg-black mt-2"></div>
        </div>
        <div className="flex flex-wrap gap-4">
          {availableFilters["size"].map((value) => {
            return (
              <NamedBoxCheckBox
                paramKey={"size"}
                key={`Size___${value}`}
                name={value}
                state={queryObject["size"]?.includes(value)}
                editSearchParams={editSearchParams}
              ></NamedBoxCheckBox>
            );
          })}
        </div>
      </div>
      {Object.keys(queryObject).length != 0 && (
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
