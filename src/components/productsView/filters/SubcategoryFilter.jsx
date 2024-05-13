import { useCategorySubcategories } from "../../../api/filters/getCategorySubcategories";
import { useSearchQueries } from "../../../hooks/searchQueries";
import FilterTitle from "./FilterTitle";
import SubcategoryCheckBox from "../checkBoxes/SubcategoryCheckBox";
import LoadingComponent from "../dataStateComponents/LoadingComponent";
import ErrorComponent from "../dataStateComponents/ErrorComponent";

function SubcategoryFilter() {
  const { queryObj, params, editSearchParamsCheckBoxFunction } =
    useSearchQueries();

  const { data, isLoading, isFetching, isError, refetch } =
    useCategorySubcategories(params.category);

  return (
    <div
      id="subcategory-filter"
      className="w-full mb-5 pl-1 transition-all duration-150"
    >
      <FilterTitle title={"Subcategories"}></FilterTitle>
      <div className="flex flex-col gap-9">
        {isLoading || isFetching ? (
          <LoadingComponent></LoadingComponent>
        ) : isError ? (
          <ErrorComponent
            refetchFunction={refetch}
            small={true}
          ></ErrorComponent>
        ) : (
          data.map((value) => {
            return (
              <SubcategoryCheckBox
                paramKey={"subcategory"}
                key={`subcategory___${value.name}`}
                name={value.name}
                editSearchParams={editSearchParamsCheckBoxFunction}
                state={queryObj["subcategory"]?.includes(value.name)}
              ></SubcategoryCheckBox>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SubcategoryFilter;
