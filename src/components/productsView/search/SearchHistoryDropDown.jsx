import { useState } from "react";
import { productSearchHistory } from "../../../objects/customSearchHistoryObject";

const SearchHistoryDropDown = function SearchHistoryDropDown({ filterVal }) {
  const initialValue =
    productSearchHistory
      .getSearchHistory()
      ?.filter((value) =>
        value.toLowerCase().includes(filterVal.toLowerCase())
      ) ?? [];

  const [searchHistory, setSearchHistory] = useState(initialValue);

  return (
    <div className="absolute top-[95%] left-[24px] bg-red-400 w-[calc(100%-24px)] h-11 rounded-sm shadow-md">
      {searchHistory.map((value) => (
        <div key={`searchHistoryElement-${value}`}>{value}</div>
      ))}
    </div>
  );
};

export default SearchHistoryDropDown;
