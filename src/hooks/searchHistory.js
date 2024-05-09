import { useEffect, useState } from "react";
import { productSearchHistory } from "../objects/customSearchHistoryObject";
import { formatHelper } from "../utils/formatHelper";
import { useSearchQueries } from "./searchQueries";

function useSearchHistory() {
  const { getQueryObject, createNewQuery } = useSearchQueries();
  const initialVal = formatHelper["sKey"](getQueryObject()["sKey"]);
  const [filterVal, setFilterVal] = useState(
    formatHelper["sKey"](getQueryObject()["sKey"])
  );
  const [searchHistory, setSearchHistory] = useState(
    productSearchHistory
      .getSearchHistory()
      ?.filter((value) =>
        value.toLowerCase().includes(filterVal.toLowerCase())
      ) ?? []
  );
  useEffect(() => {
    const value =
      productSearchHistory
        .getSearchHistory()
        ?.filter((value) =>
          value.toLowerCase().includes(filterVal.toLowerCase())
        ) ?? [];
    setSearchHistory(value);
  }, [filterVal]);

  const search = (e) => {
    if (e.key === "Enter") {
      productSearchHistory.addSearchTerm(e.target.value);
      createNewQuery({ sKey: e.target.value });
    }
  };

  const clearHistory = () => {
    productSearchHistory.clearSearchHistory();
    setSearchHistory([]);
  };
  return {
    filterVal,
    setFilterVal,
    searchHistory,

    clearHistory,
    initialVal,
    search,
  };
}

export default useSearchHistory;
