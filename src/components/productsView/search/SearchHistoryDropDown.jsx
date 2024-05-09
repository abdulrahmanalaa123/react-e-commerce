import CloseSvg from "../../../assets/svgs/close.svg";
import useSearchHistory from "../../../hooks/searchHistory";
function SearchHistoryDropDown() {
  const { searchHistory, clearHistory, search } = useSearchHistory();
  return (
    searchHistory.length > 0 && (
      <div
        className="absolute top-[95%] flex flex-col gap-4 left-[24px] bg-backgrounds-footerBg w-[calc(100%-24px)] p-4 rounded-sm shadow-md z-10 transition-transform duration-150"
        key={`${searchHistory}-${searchHistory.length}`}
      >
        {
          <button
            className="self-end text-[0.75rem] flex items-center py-1 px-4 border rounded-md border-black"
            onClick={clearHistory}
          >
            Clear History
            <img src={CloseSvg} className="w-4 h-4" />
          </button>
        }
        {searchHistory.map((value) => (
          <button key={`searchHistoryElement-${value}`} className=" w-full">
            {value}
          </button>
        ))}
      </div>
    )
  );
}

export default SearchHistoryDropDown;
