import SvgClose from "../../../assets/svgs/Close";

function SearchHistoryDropDown({
  filterVal,
  searchHistory,
  clearHistory,
  removeItemFromHistory,
  searchWithClick,
}) {
  return (
    <div
      className="absolute top-full flex flex-col gap-2 left-[24px] bg-white w-[calc(100%-24px)] p-4 rounded-sm shadow-md z-10"
      key={`${filterVal}`}
    >
      {
        <button
          className="self-end text-[0.75rem] flex justify-between items-center py-1 px-2 transition-colors duration-100 hover:text-white font-bold rounded-md hover:bg-text-300 hover:outline-2 "
          onClick={clearHistory}
        >
          Clear History
          <SvgClose className="w-4 h-4 stroke-2"></SvgClose>
        </button>
      }
      {searchHistory.map((value) => (
        <div
          key={`searchHistoryElement-${value}`}
          className="w-full flex justify-between items-center *:transition-colors *:duration-100 hover:bg-text-300 focus-visible:bg-text-300 focus-visible:text-white hover:text-white py-4 px-2 rounded-lg cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            searchWithClick(value);
          }}
        >
          {value}
          <button
            className="self-end text-[0.75rem] flex items-center py-1 px-1 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              removeItemFromHistory(value);
            }}
          >
            <SvgClose className="w-6 h-6 stroke-2"></SvgClose>
          </button>
        </div>
      ))}
    </div>
  );
}

export default SearchHistoryDropDown;
