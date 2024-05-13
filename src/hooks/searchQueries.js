import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import queryDecoder from "../utils/queryDecoder";
import { useCallback } from "react";

export const useSearchQueries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const locationKey = useLocation().key;
  const navigate = useNavigate();

  // instead of creating a function which will be created on each instance its easier to do this
  // and probably even better since i wont need to call the function everytime the value is used
  // which is queryDecoder where its used is just the updated current return value of this function
  const queryObj = queryDecoder(searchParams);

  // tried to use callback on all functions at first as a method of optimization and linking them to location.key but a form of closure happened where
  // queryObj defined in each Function was different in everyComponent it was called unless i link them all to locationKey which in turn is what changes everytime
  // this hook invokes a rerender
  // so it needs to be redefined in every render but isolated functions which doesnt contain any instance of the variables inside the hook which only sets values
  // and doesnt use existing ones can be put in a useCallback and ran only once and thats ok like for example clearQueries createNewQuery
  // well although this optimization method didnt work it was a learning experience Nonetheless

  const editSearchParamsCheckBoxFunction = (event, paramKey, val) => {
    if (event.target.checked) {
      addQueryKey(paramKey, val);
    } else {
      removeQueryKey(paramKey, val);
    }
  };

  //this works wont try to optimize
  const addQueryKey = (key, val) => {
    if (queryObj["pageNo"]) {
      delete queryObj.pageNo;
    }
    if (Array.isArray(queryObj[key]) && !queryObj[key]?.includes(val)) {
      queryObj[key] = [...queryObj[key], val];
    } else {
      queryObj[key] = [val];
    }
    // since im kinda sure taht my decoder will return an array so its easier than checking for the element itself first then checking if its an array
    // testing is needed ofc
    setSearchParams(createSearchParams(queryObj));
  };
  // will be used in pageNo only probably
  const editQueryKey = (key, val) => {
    // since im kinda sure taht my decoder will return an array so its easier than checking for the element itself first then checking if its an array
    // testing is needed ofc
    if (Array.isArray(queryObj[key])) {
      queryObj[key] = [val];
    } else {
      queryObj[key] = [val];
    }
    setSearchParams(createSearchParams(queryObj));
  };
  //this works wont try to optimize
  const removeQueryKey = (key, val) => {
    if (Array.isArray(queryObj[key])) {
      queryObj[key] = queryObj[key].filter((element) => element !== val);
    }
    setSearchParams(createSearchParams(queryObj));
  };
  // object must be in format {key:[val] or key:[val1,val2,val3]}

  // this is used for search queries thats why i want this behaviour \
  // maybe not preferred but things have gotten out of hand and rebuilding all that aint worth the trouble
  const createNewQuery = useCallback((object) => {
    navigate("/products", { replace: true });
    setSearchParams(createSearchParams(object));
  }, []);

  const clearQueries = useCallback(() => {
    setSearchParams(createSearchParams({}));
  }, []);

  return {
    clearQueries,
    createNewQuery,
    removeQueryKey,
    editQueryKey,
    addQueryKey,
    locationKey,

    searchParams,
    queryObj,
    params,
    editSearchParamsCheckBoxFunction,
  };
};
