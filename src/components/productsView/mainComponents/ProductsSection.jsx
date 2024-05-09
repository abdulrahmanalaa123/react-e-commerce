import { useProducts } from "../../../api/products/getProducts";
import ProductImage from "../../../assets/images/product.png";
import Heart from "../../../assets/svgs/Heart";
import { useSearchQueries } from "../../../hooks/searchQueries";
import HoverButton from "../../buttons/HoverButton";
import ErrorComponent from "../dataStateComponents/ErrorComponent";
import LoadingComponent from "../dataStateComponents/LoadingComponent";
import PaginationComponent from "../pagination/PaginationComponent";

const product = {
  image: ProductImage,
};

function ProductsSection() {
  const { getQueryObject, params } = useSearchQueries();

  const { data, error, isError, isLoading, isFetching, refetch } = useProducts({
    category: params.category,
    queryObject: getQueryObject(),
  });

  // would like to optimize for a use callback or use memo
  return (
    <section id="Products-Section" className="flex-auto">
      <p className="text-text-300 font-medium text-md mb-4">Results</p>
      {/* using inline ternary operations instead of seperate returns because i want them to be inside the section */}
      {isLoading || isFetching ? (
        <LoadingComponent></LoadingComponent>
      ) : isError ? (
        <ErrorComponent refetchFunction={refetch}></ErrorComponent>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,max-content))]  sm:grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
            {data.data.map((element, index) => (
              <div
                key={index}
                className="bg-backgrounds-cardsBg flex flex-col relative items-center justify-center gap-2 py-2 "
              >
                <HoverButton></HoverButton>
                {/* UI on the image responsiveness needs work  */}
                {/* design specifications idk if its a good design choice or a bad one */}
                <img
                  src={product.image}
                  className="max-w-[94px] max-h-[120px]"
                />
                <p className="text-center text-wrap w-[20ch] text-ellipsis overflow-clip">
                  {element.name}
                </p>
                <p>{`${element.price}$`}</p>
                <button
                  className="absolute right-2 top-2"
                  onClick={() => {
                    console.log("heart clicked");
                  }}
                >
                  <Heart></Heart>
                </button>
              </div>
            ))}
          </div>
          <PaginationComponent count={data.count}></PaginationComponent>
        </>
      )}
    </section>
  );
}

export default ProductsSection;

// failed attempt at solving the pageNo issue using closures was pointless and i knew from the beginning but was fun nonetheless
// learend alot about closures using it
// const theFunction = (() => {
//   let prevQueryObj = {};
//   let activePage;
//   let totalPages;
//   let currentDependencyChange = true;

//   function dependencyChange(queryObj) {
//     console.log("prevQueryObj", prevQueryObj);
//     console.log("enteredObject", queryObj);
//     const iterable = Object.keys(queryObj).filter(([key]) => key !== "pageNo");
//     currentDependencyChange = false;
//     for (const key of iterable) {
//       if (prevQueryObj[key]) {
//         const lookup = queryObj[key].reduce(
//           (accum, val) => ({ ...accum, [val]: val }),
//           {}
//         );
//         const returnBool = prevQueryObj[key].reduce(
//           (_, val) => lookup[val] === undefined,
//           true
//         );
//         if (returnBool) {
//           prevQueryObj = { ...queryObj };
//           delete prevQueryObj.pageNo;

//           currentDependencyChange = true;
//           break;
//         }
//       } else {
//         prevQueryObj = { ...queryObj };
//         delete prevQueryObj.pageNo;

//         currentDependencyChange = true;
//         break;
//       }
//     }
//     return resultsClosure;
//   }

//   function resultsClosure(queryObj) {
//     console.log("currentDependency", currentDependencyChange);
//     activePage = queryObj["pageNo"] ?? 1;
//     if (currentDependencyChange) {
//       totalPages = Array.from(
//         { length: Number(activePage) - 1 },
//         (_, index) => index + 1
//       );
//     }

//     return { activePage, totalPages };
//   }
//   return dependencyChange;
// })();
