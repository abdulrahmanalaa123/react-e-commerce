import { createSearchParams, useSearchParams } from "react-router-dom";
import queryDecoder from "../utils/queryDecoder";

export const useSearchQueries = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  //this works wont try to optimize
  const addQueryKey = (key, val) => {
    const queryObj = getQueryObject();
    // since im kinda sure taht my decoder will return an array so its easier than checking for the element itself first
    // testing is needed ofc
    if (Array.isArray(queryObj[key]) && !queryObj[key]?.includes(val)) {
      queryObj[key] = [...queryObj[key], val];
    } else {
      queryObj[key] = [val];
    }

    setSearchParams(createSearchParams(queryObj));
  };
  //this works wont try to optimize
  const removeQueryKey = (key, val) => {
    const queryObj = getQueryObject();
    if (Array.isArray(queryObj[key])) {
      queryObj[key] = queryObj[key].filter((element) => element !== val);
    }

    setSearchParams(createSearchParams(queryObj));
  };
  //object must be in format {key:[val] or key:[val1,val2,val3]}
  const createNewQuery = (object) => {
    setSearchParams(createSearchParams(object));
  };
  const getQueryObject = () => {
    return queryDecoder(searchParams);
  };
  const clearQueries = () => {
    setSearchParams(createSearchParams({}));
  };

  return {
    clearQueries,
    createNewQuery,
    removeQueryKey,
    addQueryKey,
    getQueryObject,
    searchParams,
  };
};
