import { useSearchQueries } from "../../../hooks/searchQueries";
import { formatHelper } from "../../../utils/formatHelper";
import LeftArrow from "../../../assets/svgs/LeftArrow";
import SvgArrow from "../../../assets/svgs/Arrow";
import trailsCalculator from "../../../utils/paginationCalculator";
import PaginationButton from "./PaginationButton";

function PaginationComponent({ count }) {
  const { getQueryObject, editQueryKey } = useSearchQueries();

  // there is a way more efficient way to do it since only thing that needs to be decoupled is the totalPages and the trails Calculator is changed only if the activePage state
  // changes seperating them out of 1 fuinction is the best solution because they all require different states to compute especially the trailsCalculator but fuck it
  //  that would enable each component not to rerender and decouple it from the sucess state in the products section which would be cleaner
  const { activePage, totalPages, trailingState } = (() => {
    const queryObj = getQueryObject();
    const activePage = formatHelper["pageNo"](queryObj["pageNo"]);
    const totalPages = Math.ceil(count / 16);
    const trailingState = trailsCalculator(totalPages, activePage);
    return { activePage, totalPages, trailingState };
  })();
  return (
    totalPages !== 0 && (
      <div
        className="flex items-baseline justify-center mt-10 gap-4 flex-wrap"
        id="Pagination-Buttons"
      >
        <button
          id="Back-Button"
          className="group text-buttons-unhoveredProductButtons
            disabled:border-buttons-unhoveredProductButtons disabled:text-buttons-unhoveredProductButtons hover-enabled:text-black
             border-buttons-unhoveredProductButtons border hover:border-black p-2 rounded-sm"
          onClick={() => {
            editQueryKey("pageNo", activePage - 1);
          }}
          disabled={activePage <= 1}
        >
          <LeftArrow className="group-hover:fill-black group-disabled:fill-buttons-unhoveredProductButtons fill-buttons-unhoveredProductButtons inline-block mr-1"></LeftArrow>
          Back
        </button>
        {/* using event bubbling for pagination using the inner value of each button child since the pagination components are 
        simple and are just a simple button with a val inside it which cant be used everywhere but here it worked like the products view for example
        each press has a unique id which is isnt apparent in the html but here it works can be used in the subcategories filter but i wont 
        this is here just as a learning trick and a proof of  concept
         */}
        <div
          className="flex gap-4 flex-wrap"
          onClick={(e) => {
            editQueryKey("pageNo", e.target.innerText);
          }}
        >
          <PaginationButton
            val={1}
            active={1 === Number(activePage)}
          ></PaginationButton>
          {trailingState.preceedingTrailing && (
            <div className="font-bold text-black ">...</div>
          )}
          {trailingState.length > 0 &&
            Array.from(
              { length: trailingState.length },
              (_, index) => index + trailingState.startIndex
            ).map((val) => {
              return (
                <PaginationButton
                  val={val}
                  active={val === Number(activePage)}
                  key={`page-button-${val}`}
                ></PaginationButton>
              );
            })}
          {trailingState.leadingTrailing && (
            <div className="font-bold text-black ">...</div>
          )}
          {totalPages !== 1 && (
            <PaginationButton
              val={totalPages}
              active={totalPages === Number(activePage)}
            ></PaginationButton>
          )}
        </div>

        <button
          id="Next-Button"
          className="group text-buttons-unhoveredProductButtons
             disabled:border-buttons-unhoveredProductButtons disabled:text-buttons-unhoveredProductButtons hover:text-black
              border-buttons-unhoveredProductButtons border hover:border-black p-2 rounded-sm"
          onClick={() => {
            editQueryKey("pageNo", activePage + 1);
          }}
          disabled={activePage >= totalPages}
        >
          Next
          <SvgArrow className="group-hover:fill-black group-disabled:fill-buttons-unhoveredProductButtons fill-buttons-unhoveredProductButtons inline-block ml-1"></SvgArrow>
        </button>
      </div>
    )
  );
}

export default PaginationComponent;
