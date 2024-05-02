import {
  createSearchParams,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import productsQueryGenerator from "../utils/queryGenerator";
import searchProducts from "../api/proudcts/searchProducts";
import queryDecoder from "../utils/queryDecoder";
import filterSVG from "../assets/svgs/filter.svg";
import FilterCheckBox from "../components/products/FilterCheckBox";

function ProductsLayout() {
  const params = useParams();
  const location = useLocation();
  //the problem now is it rerenders the whole component on the whole component and i want only the products component to rerender
  // but this is an issue to fix later

  let [searchParams, setSearchParams] = useSearchParams();
  console.log("rendered");
  // its handled with two because of using the built in target checker instead of passing the paramKey and values to the param and using one on change function
  // and needing to use event
  // on second thoughts its better this way
  function editSearchParams(event, paramKey, name) {
    if (event.target.checked) {
      const finalParam = { ...searchParams };
      finalParam[paramKey] = name;
      setSearchParams(createSearchParams(finalParam));
      console.log("added", paramKey, name);
    } else {
      const finalParam = queryDecoder(searchParams);
      delete finalParam[paramKey];
      setSearchParams(createSearchParams(finalParam));
      console.log("removed", paramKey, name);
    }
  }
  return (
    <>
      <section id="search">
        <div>searchBar</div>
      </section>
      <section id="products-view" className="flex w-full h-full">
        <section id="filters" className="flex flex-col w-[256px] items-center">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-medium text-md ">Filter</span>
            <img src={filterSVG} alt="filter-icon" className="w-5 h-4" />
          </div>
          <div id="category-filter" className="w-full">
            <div>
              <p className="font-medium text-md text-center ">Categories</p>
              <div className="w-full h-[2px] bg-black mt-3"></div>
            </div>
            <div className="w-full">
              <FilterCheckBox
                name={"Trees"}
                editSearchParams={editSearchParams}
                paramKey={"Subcategories"}
              ></FilterCheckBox>
              <FilterCheckBox
                name={"Trees"}
                editSearchParams={editSearchParams}
                paramKey={"Subcategories"}
              ></FilterCheckBox>
              <FilterCheckBox
                name={"Trees"}
                editSearchParams={editSearchParams}
                paramKey={"Subcategories"}
              ></FilterCheckBox>
              <FilterCheckBox
                name={"Trees"}
                editSearchParams={editSearchParams}
                paramKey={"Subcategories"}
              ></FilterCheckBox>
            </div>
          </div>
        </section>
        <div className="flex-auto">
          <div>{location.pathname}</div>
        </div>
      </section>
    </>
  );
}

export default ProductsLayout;
{
  /* <button
          onClick={() => {
            searchProducts({ searchparamKey: "tree" });
            const queryParams = productsQueryGenerator();
            console.log(queryDecoder({ searchParam: queryParams }));
            console.log(params);
          }}
        >
          GetParams
        </button> */
}
