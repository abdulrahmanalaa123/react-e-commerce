import CloseSvg from "../../../assets/svgs/close.svg";

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
          className="self-end text-[0.75rem] flex justify-between py-1 px-2 border rounded-md border-black hover:bg-backgrounds-modalBg"
          onClick={clearHistory}
        >
          Clear History
          <img src={CloseSvg} className="w-4 h-4" />
        </button>
      }
      {searchHistory.map((value) => (
        <div
          key={`searchHistoryElement-${value}`}
          className="w-full flex justify-between hover:bg-backgrounds-cardsBg py-4 px-2 rounded-lg cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            searchWithClick(value);
          }}
        >
          {value}
          <button
            className="self-end text-[0.75rem] flex items-center py-1 px-1 border rounded-md border-black z-10 hover:bg-backgrounds-cardsBg"
            onClick={(e) => {
              e.stopPropagation();
              removeItemFromHistory(value);
            }}
          >
            <img src={CloseSvg} className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default SearchHistoryDropDown;
