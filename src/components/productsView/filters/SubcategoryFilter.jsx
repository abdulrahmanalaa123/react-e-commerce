import { useSubcategories } from "../../../api/filters/getSubcategories";
import { useSearchQueries } from "../../../hooks/searchQueries";
import FilterTitle from "./FilterTitle";
import SubcategoryCheckBox from "../checkBoxes/SubcategoryCheckBox";

function SubcategoryFilter() {
  const { getQueryObject, params, editSearchParamsCheckBoxFunction } =
    useSearchQueries();
  const queryObject = getQueryObject();
  const { data, isSuccess } = useSubcategories(params.category);
  return (
    <div id="subcategory-filter" className="w-full mb-5">
      <FilterTitle title={"Subcategories"}></FilterTitle>
      <div className="flex flex-col gap-9">
        {isSuccess &&
          data.map((value) => {
            return (
              <SubcategoryCheckBox
                paramKey={"subcategory"}
                key={`subcategory___${value.name}`}
                name={value.name}
                editSearchParams={editSearchParamsCheckBoxFunction}
                state={queryObject["subcategory"]?.includes(value.name)}
              ></SubcategoryCheckBox>
            );
          })}
      </div>
    </div>
  );
}

export default SubcategoryFilter;
