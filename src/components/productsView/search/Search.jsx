import { useLocation } from "react-router-dom";
import MobileFilterButton from "../filters/MobileFilterButton";
import SearchBar from "../mainComponents/SearchBar";

function Search() {
  const locationKey = useLocation().key;
  return (
    <div className="w-full px-4 flex items-center gap-2 mx-auto md:w-1/2 md:px-0">
      <SearchBar key={`${locationKey}`}></SearchBar>
      {/* only reason for putting the mobile filter Button here because if i edit the locationKey by using filters it closes mymodal because of the searchBar key 
    handler so either create  a search layout and then add a mobileButton and search bar which sounded illogical so it was best to put it here*/}
      <MobileFilterButton></MobileFilterButton>
    </div>
  );
}

export default Search;
