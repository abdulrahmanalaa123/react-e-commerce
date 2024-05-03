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
import SubCategoryCheckBox from "../components/productsView/SubCategoryCheckBox";
import ColorCheckBox from "../components/productsView/ColorCheckBox";
import BoxedCheckBox from "../components/productsView/BoxedCheckBox";

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
          <div id="category-filter" className="w-full mb-5">
            <div className="mb-9">
              <p className="font-medium text-md text-center ">Categories</p>
              <div className="w-full h-[2px] bg-black mt-2"></div>
            </div>
            <div className="flex flex-col gap-9">
              <SubCategoryCheckBox
                name={"Trees"}
                editSearchParams={editSearchParams}
                paramKey={"Subcategories"}
              ></SubCategoryCheckBox>
              <SubCategoryCheckBox
                name={"Brown"}
                editSearchParams={editSearchParams}
                paramKey={"Color"}
              ></SubCategoryCheckBox>
              <SubCategoryCheckBox
                name={"Indoor Plants"}
                editSearchParams={editSearchParams}
                paramKey={"Subcategories"}
              ></SubCategoryCheckBox>
              <SubCategoryCheckBox
                name={"0"}
                editSearchParams={editSearchParams}
                paramKey={"Price"}
              ></SubCategoryCheckBox>
            </div>
          </div>
          <div id="color-filter" className="w-full mb-5">
            <div className="mb-9">
              <p className="font-medium text-md text-center ">Color Options</p>
              <div className="w-full h-[2px] bg-black mt-2"></div>
            </div>
            <div className="flex place-content-center gap-2">
              <ColorCheckBox
                name={"Beige"}
                editSearchParams={editSearchParams}
                paramKey={"Color"}
              ></ColorCheckBox>
              <ColorCheckBox
                name={"Red"}
                editSearchParams={editSearchParams}
                paramKey={"Color"}
              ></ColorCheckBox>
              <ColorCheckBox
                name={"Yellow"}
                editSearchParams={editSearchParams}
                paramKey={"Color"}
              ></ColorCheckBox>
              <ColorCheckBox
                name={"Green"}
                editSearchParams={editSearchParams}
                paramKey={"Color"}
              ></ColorCheckBox>
              <ColorCheckBox
                name={"Blue"}
                editSearchParams={editSearchParams}
                paramKey={"Color"}
              ></ColorCheckBox>
              <ColorCheckBox
                name={"Purple"}
                editSearchParams={editSearchParams}
                paramKey={"Color"}
              ></ColorCheckBox>
            </div>
          </div>
          <div id="size-filter" className="w-full">
            <div className="mb-9">
              <p className="font-medium text-md text-center ">Size</p>
              <div className="w-full h-[2px] bg-black mt-2"></div>
            </div>
            <div className="flex flex-wrap gap-4 ">
              <BoxedCheckBox
                name={"Small"}
                editSearchParams={editSearchParams}
                paramKey={"Size"}
              ></BoxedCheckBox>
              <BoxedCheckBox
                name={"Medium"}
                editSearchParams={editSearchParams}
                paramKey={"Size"}
              ></BoxedCheckBox>
              <BoxedCheckBox
                name={"Large"}
                editSearchParams={editSearchParams}
                paramKey={"Size"}
              ></BoxedCheckBox>{" "}
              <BoxedCheckBox
                name={"XLarge"}
                editSearchParams={editSearchParams}
                paramKey={"Size"}
              ></BoxedCheckBox>
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
