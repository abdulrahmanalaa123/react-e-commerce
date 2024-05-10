import { useEffect, useState } from "react";
import { productSearchHistory } from "../objects/customSearchHistoryObject";
import { formatHelper } from "../utils/formatHelper";
import { useSearchQueries } from "./searchQueries";

function useSearchHistory() {
  const { getQueryObject, createNewQuery } = useSearchQueries();
  const initialValSetter = () => formatHelper["sKey"](getQueryObject()["sKey"]);
  const [filterVal, setFilterVal] = useState(initialValSetter);
  const searchHistorySetter = () =>
    productSearchHistory.getSearchHistory().filter((value) => {
      return value.toLowerCase().includes(filterVal.toLowerCase());
    });
  const [searchHistory, setSearchHistory] = useState(searchHistorySetter);

  useEffect(() => {
    setSearchHistory(searchHistorySetter());
  }, [filterVal]);

  const searchWithKeys = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      productSearchHistory.addSearchTerm(e.target.value);
      createNewQuery({ sKey: e.target.value });
    }
  };

  const searchWithClick = (item) => {
    productSearchHistory.addSearchTerm(item);
    createNewQuery({ sKey: item });
  };

  const clearHistory = () => {
    productSearchHistory.clearSearchHistory();
    setSearchHistory([]);
  };

  const removeItemFromHistory = (item) => {
    productSearchHistory.removeSearchTerm(item);

    setSearchHistory(productSearchHistory.getSearchHistory());
  };
  return {
    filterVal,
    setFilterVal,
    searchHistory,
    removeItemFromHistory,
    clearHistory,
    searchWithKeys,
    searchWithClick,
  };
}

export default useSearchHistory;
