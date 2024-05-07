import { useProducts } from "../../../api/products/getProducts";
import ProductImage from "../../../assets/images/product.png";
import SvgArrow from "../../../assets/svgs/Arrow";
import Heart from "../../../assets/svgs/Heart";
import { useSearchQueries } from "../../../hooks/searchQueries";
import HoverButton from "../../buttons/HoverButton";
import PaginationButton from "../PaginationButton";
import { formatHelper } from "../../../utils/formatHelper";
import LeftArrow from "../../../assets/svgs/LeftArrow";
const product = {
  image: ProductImage,
};

function ProductsSection() {
  const { getQueryObject, params, editQueryKey } = useSearchQueries();

  const { data, error, isError, isLoading, isFetching, isSuccess } =
    useProducts({
      category: params.category,
      queryObject: getQueryObject(),
    });

  const { activePage, totalPages, trailingState } = (() => {
    const queryObj = getQueryObject();
    const activePage = formatHelper["pageNo"](queryObj["pageNo"]);
    let totalPages;
    let trailingState = {
      startIndex: 2,
      length: 0,
      leadingTrailing: false,
      preceedingTrailing: false,
    };
    if (isSuccess) {
      totalPages = Math.ceil(data.count / 16);
      trailingState = trailsCalculator(totalPages, activePage);
    }
    return { activePage, totalPages, trailingState };
  })();

  return (
    <section id="Products-Section" className="flex-auto">
      <p className="text-text-300 font-medium text-md mb-4">Results</p>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,max-content))]  sm:grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
        {isSuccess ? (
          data.data.map((element, index) => (
            <div
              key={index}
              className="bg-backgrounds-cardsBg flex flex-col relative items-center justify-center gap-2 py-2 "
            >
              <HoverButton></HoverButton>
              {/* UI on the image responsiveness needs work  */}
              {/* design specifications idk if its a good design choice or a bad one */}
              <img src={product.image} className="max-w-[94px] max-h-[120px]" />
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
          ))
        ) : (
          <div className="text-primary-300">Loading....</div>
        )}
      </div>
      {isSuccess && data.data.length !== 0 && (
        <div className="flex items-baseline justify-center mt-10 gap-4 flex-wrap">
          <button
            className="group text-buttons-unhoveredProductButtons hover:text-black border-buttons-unhoveredProductButtons border hover:border-black p-2 rounded-sm"
            onClick={() => {
              editQueryKey("pageNo", activePage - 1);
            }}
          >
            <LeftArrow className="group-hover:fill-black fill-buttons-unhoveredProductButtons inline-block mr-1"></LeftArrow>
            Back
          </button>
          <PaginationButton
            val={1}
            active={1 === Number(activePage)}
            onclick={() => {
              // this is bs because i know it will remove pageNo parameter i can keept it
              editQueryKey("pageNo", 1);
            }}
          ></PaginationButton>
          {trailingState.preceedingTrailing && (
            <div className="font-bold text-black ">...</div>
          )}
          {trailingState.length > 0 ? (
            Array.from(
              { length: trailingState.length },
              (_, index) => index + trailingState.startIndex
            ).map((val) => {
              return (
                <PaginationButton
                  val={val}
                  active={val === Number(activePage)}
                  key={`page-button-${val}`}
                  onclick={() => {
                    // this is bs because i know it will remove pageNo parameter i can keept it
                    editQueryKey("pageNo", val);
                  }}
                ></PaginationButton>
              );
            })
          ) : (
            <></>
          )}
          {trailingState.leadingTrailing && (
            <div className="font-bold text-black ">...</div>
          )}
          <PaginationButton
            val={totalPages}
            active={totalPages === Number(activePage)}
            onclick={() => {
              // this is bs because i know it will remove pageNo parameter i can keept it
              editQueryKey("pageNo", totalPages);
            }}
          ></PaginationButton>
          {activePage < totalPages && (
            <button
              className="group text-buttons-unhoveredProductButtons hover:text-black border-buttons-unhoveredProductButtons border hover:border-black p-2 rounded-sm"
              onClick={() => {
                editQueryKey("pageNo", activePage + 1);
              }}
            >
              Next
              <SvgArrow className="group-hover:fill-black fill-buttons-unhoveredProductButtons inline-block ml-1"></SvgArrow>
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default ProductsSection;

function trailsCalculator(totalPages, activePage) {
  // should be 3 for mobile devices
  const valuesCount = 4;
  const preceedingLimit = Math.floor(valuesCount / 2);
  const leadingLimit = Math.ceil(valuesCount / 2);

  // main equation activePage - 1 (start element) > preceedingLimit + 1 (element worth to put the ellipsis for)
  const preceedingTrailing =
    activePage > preceedingLimit + 2 && totalPages > valuesCount + 2;

  const leadingTrailing =
    totalPages - activePage > leadingLimit + 2 && totalPages > valuesCount + 2;

  let startIndex;
  let length;
  if (!preceedingTrailing && !leadingTrailing) {
    startIndex = 2;
    length = totalPages - startIndex;
  } else if (preceedingTrailing && leadingTrailing) {
    startIndex = activePage - preceedingLimit;
    length = valuesCount;
  } else if (preceedingTrailing && !leadingTrailing) {
    startIndex = totalPages - valuesCount;
    length = valuesCount;
  } else if (!preceedingTrailing && leadingTrailing) {
    startIndex = 2;
    length = valuesCount;
  }
  return { startIndex, length, leadingTrailing, preceedingTrailing };
}
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
