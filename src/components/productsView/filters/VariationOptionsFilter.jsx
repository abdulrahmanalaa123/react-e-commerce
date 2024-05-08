import { useVariationOptions } from "../../../api/filters/getFilters";
import { useSearchQueries } from "../../../hooks/searchQueries";
import FilterTitle from "./FilterTitle";
import ColorCheckBox from "../checkBoxes/ColorCheckBox";
import NamedBoxCheckBox from "../checkBoxes/NamedBoxCheckBox";
import LoadingComponent from "../dataStateComponents/LoadingComponent";
import ErrorComponent from "../dataStateComponents/ErrorComponent";

// can be used instead of showing the values and using only the categories and filter using them
// maybe later im happy with the current design choice
const availableFilters = {
  color: ["Beige", "Red", "Yellow", "Green", "Blue", "Purple"],
  size: ["Small", "Medium", "Large"],
};
function VariationOptionsFilter() {
  const { getQueryObject, params, editSearchParamsCheckBoxFunction } =
    useSearchQueries();
  const queryObject = getQueryObject();
  const { data, isLoading, isFetching, isError, refetch } = useVariationOptions(
    params.category
  );

  if (isLoading || isFetching) {
    return (
      <>
        <div className="h-[2px] bg-black w-full"></div>
        <LoadingComponent></LoadingComponent>
      </>
    );
  }
  if (isError) {
    return (
      <ErrorComponent refetchFunction={refetch} small={true}></ErrorComponent>
    );
  }
  return Object.keys(data).map((key) => {
    const normalizedKey = key.toLowerCase();

    return (
      <div
        id={`${normalizedKey}-filter`}
        key={`${normalizedKey}`}
        className="w-full mb-5 pl-1"
      >
        {/* normal key is used because its capitalized */}
        <FilterTitle title={`${key} options`}></FilterTitle>
        <div className="flex flex-wrap gap-4">
          {data[key].map((val) => {
            if (normalizedKey === "color") {
              return (
                <ColorCheckBox
                  paramKey={normalizedKey}
                  // 3 underscores used because naming of the element ids inside is with a dash
                  // so no confusion happens if it can even happen that ids can interefere with component keys in react while i think it doesnt
                  key={`${normalizedKey}___${val}`}
                  name={val}
                  editSearchParams={editSearchParamsCheckBoxFunction}
                  state={queryObject[normalizedKey]?.includes(val)}
                ></ColorCheckBox>
              );
            } else {
              return (
                <NamedBoxCheckBox
                  paramKey={normalizedKey}
                  // 3 underscores used because naming of the element ids inside is with a dash
                  // so no confusion happens if it can even happen that ids can interefere with component keys in react while i think it doesnt
                  key={`${normalizedKey}___${val}`}
                  name={val}
                  editSearchParams={editSearchParamsCheckBoxFunction}
                  state={queryObject[normalizedKey]?.includes(val)}
                ></NamedBoxCheckBox>
              );
            }
          })}
        </div>
      </div>
    );
  });
}

export default VariationOptionsFilter;
