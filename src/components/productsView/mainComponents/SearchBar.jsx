import filterSVG from "../../../assets/svgs/filter.svg";
import { useSearchQueries } from "../../../hooks/searchQueries";
import { productSearchHistory } from "../../../objects/customSearchHistoryObject";
import { formatHelper } from "../../../utils/formatHelper";
import { useState } from "react";
import SearchHistoryDropDown from "../search/SearchHistoryDropDown";
import useHandleClickOutisde from "../../../hooks/handleClickOutside";

function SearchBar() {
  const { getQueryObject, createNewQuery } = useSearchQueries();
  const [filterVal, setFilterVal] = useState(
    formatHelper["sKey"](getQueryObject()["sKey"])
  );
  const [searchHistoryDropDownShown, setSearchHistoryDropDownShown] =
    useState(false);

  const ref = useHandleClickOutisde(handleClickOutside);

  function handleClickOutside() {
    setSearchHistoryDropDownShown(false);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      productSearchHistory.addSearchTerm(e.target.value);
      createNewQuery({ sKey: e.target.value });
    }
  }
  return (
    <div className="w-full px-4 flex items-center gap-2 mx-auto md:w-1/2 md:px-0">
      <div className="relative flex-auto " ref={ref}>
        <input
          type="text"
          id="search-bar"
          className=" py-[10px] px-7 w-full peer rounded-lg border-[#EAEAEF] border focus-visible:border-2 transition-colors duration-150
         focus-visible:border-primary-300  focus-visible:outline-none focus-visible:shadow-none   text-[#32324D] placeholder:text-[#8E8EA9]"
          placeholder="Search for an Entry"
          onKeyDown={handleKeyDown}
          value={filterVal}
          autoFocus={formatHelper["sKey"](getQueryObject()["sKey"])}
          onFocus={() => {
            setSearchHistoryDropDownShown(true);
          }}
          onChange={(e) => {
            setFilterVal(e.target.value);
          }}
        />
        {searchHistoryDropDownShown && (
          <SearchHistoryDropDown filterVal={filterVal}></SearchHistoryDropDown>
        )}
        <label
          htmlFor="search-bar"
          // the iteration was first static position wiht mediqueries left then calcculated position left-12px and top(calc(50%-5px)) half the size of my icon
          // then flex with items center and left-[12px] which solved the centering but not that the label is too small then w-24 which is the desired padding and items-end
          // in this final version and rounded-l-24 to not press outside the search bar and focus it by mistake alot of thought went into this css
          // couldve went with just create this flex div and create the label as well as gicving the input the rest which wouldve been easier af
          // but i learned alot from doing it like that and it works so im gonna leave it at that
          className="absolute inset-0 flex h-full w-6 rounded-l-lg items-center justify-end transition-colors duration-150 peer-focus-visible:*:fill-primary-300 *:fill-[#B3B5B9] "
        >
          <svg
            width={10}
            height={10}
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.92188 8.40146L7.71354 6.16506C8.07292 5.53762 8.26042 4.83989 8.26042 4.13694C8.26042 1.85629 6.40625 0 4.13021 0C1.85417 0 0 1.85629 0 4.13694C0 6.4176 1.85417 8.27389 4.13021 8.27389C4.85677 8.27389 5.57552 8.07342 6.21615 7.69071L8.41406 9.91929C8.46354 9.96876 8.53385 10 8.60417 10C8.67448 10 8.74479 9.97136 8.79427 9.91929L9.92188 8.77896C10.026 8.67222 10.026 8.5056 9.92188 8.40146ZM4.12972 1.61133C5.52034 1.61133 6.65055 2.74385 6.65055 4.13671C6.65055 5.52958 5.52034 6.6621 4.12972 6.6621C2.7391 6.6621 1.60889 5.52958 1.60889 4.13671C1.60889 2.74385 2.7391 1.61133 4.12972 1.61133Z"
            />
          </svg>
        </label>
      </div>

      <button className="md:hidden  p-2">
        <img src={filterSVG} alt="open-filter-menu" />
      </button>
    </div>
  );
}

export default SearchBar;
