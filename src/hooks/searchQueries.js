import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import queryDecoder from "../utils/queryDecoder";
import { useCallback } from "react";

// can be decomposed into a hook that gives searchParams and queryObject and all of the functions could be in a seperate hook of their own using that hook

export const useSearchQueries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const location = useLocation();
  const locationKey = location.key;
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

  const navigateIfDifferent = (newSearchQuery) => {
    const isInAdifferentPage = !location.pathname.includes("products");
    if (isInAdifferentPage) {
      navigate(`/products?${newSearchQuery}`);
    } else {
      setSearchParams(newSearchQuery);
    }
  };
  const editSearchParamsCheckBoxFunction = (event, paramKey, val) => {
    if (event.target.checked) {
      addQueryKey(paramKey, val);
    } else {
      removeQueryKey(paramKey, val);
    }
  };

  //this works wont try to optimize
  const addQueryKey = (key, val) => {
    const localQueryObj = { ...queryObj };
    if (localQueryObj["pageNo"]) {
      delete localQueryObj.pageNo;
    }
    if (
      Array.isArray(localQueryObj[key]) &&
      !localQueryObj[key]?.includes(val)
    ) {
      localQueryObj[key] = [...localQueryObj[key], val];
    } else {
      localQueryObj[key] = [val];
    }
    // since im kinda sure taht my decoder will return an array so its easier than checking for the element itself first then checking if its an array
    // testing is needed ofc
    navigateIfDifferent(createSearchParams(localQueryObj));
  };
  // will be used in pageNo only probably
  const editQueryKey = (key, val) => {
    // since im kinda sure taht my decoder will return an array so its easier than checking for the element itself first then checking if its an array
    // testing is needed ofc
    const localQueryObj = { ...queryObj };
    localQueryObj[key] = [val];
    setSearchParams(createSearchParams(localQueryObj));
  };
  // used in product view only as well but needs the same dependencies so its put in here
  const bundledEditQueryKey = useCallback((entries) => {
    setSearchParams(createSearchParams(Object.fromEntries(entries)));
  }, []);
  //this works wont try to optimize
  const removeQueryKey = (key, val) => {
    const localQueryObj = { ...queryObj };
    if (localQueryObj["pageNo"]) {
      delete localQueryObj.pageNo;
    }
    if (Array.isArray(localQueryObj[key])) {
      localQueryObj[key] = localQueryObj[key].filter(
        (element) => element !== val
      );
    }
    navigateIfDifferent(createSearchParams(localQueryObj));
  };
  // object must be in format {key:[val] or key:[val1,val2,val3]}

  // this is used for search queries thats why i want this behaviour \
  // maybe not preferred but things have gotten out of hand and rebuilding all that aint worth the trouble
  const createNewQuery = useCallback((object) => {
    navigate(`/products?${createSearchParams(object)}`, { replace: true });
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
    bundledEditQueryKey,
    navigate,
    searchParams,
    queryObj,
    params,
    editSearchParamsCheckBoxFunction,
  };
};
