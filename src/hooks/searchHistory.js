import { useCallback, useEffect, useState } from "react";
import { productSearchHistory } from "../objects/customSearchHistoryStorageObject";
import { formatHelper } from "../utils/formatHelper";
import { useSearchQueries } from "./searchQueries";

function useSearchHistory() {
  const { queryObj, createNewQuery } = useSearchQueries();

  const initialValSetter = () => formatHelper["sKey"](queryObj["sKey"]);
  const [filterVal, setFilterVal] = useState(initialValSetter);
  const searchHistorySetter = () =>
    productSearchHistory.getSearchHistory().filter((value) => {
      return value.toLowerCase().includes(filterVal.toLowerCase());
    });
  const [searchHistory, setSearchHistory] = useState(searchHistorySetter);

  useEffect(() => {
    setSearchHistory(searchHistorySetter());
  }, [filterVal]);

  // here using callBack is ok and actually good since these functions cant closure anyValues it just calls the localStorage which saves the states
  // theyre only pure mutation funcitons so optimizing using useCallback is ok and doesnt hurt the initialDesign
  // only thing is Idont know if using useCallback here is good since this customHook is called in one Component Only so i dont know but lets just keep it like this

  const searchWithKeys = useCallback((e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      productSearchHistory.addSearchTerm(e.target.value);
      createNewQuery({ sKey: e.target.value });
    }
  }, []);

  const searchWithClick = useCallback((item) => {
    productSearchHistory.addSearchTerm(item);
    createNewQuery({ sKey: item });
  }, []);

  const clearHistory = useCallback(() => {
    productSearchHistory.clearSearchHistory();
    setSearchHistory([]);
  }, []);

  const removeItemFromHistory = useCallback((item) => {
    productSearchHistory.removeSearchTerm(item);

    setSearchHistory(productSearchHistory.getSearchHistory());
  }, []);
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
