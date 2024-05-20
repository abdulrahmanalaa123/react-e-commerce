import { useEffect } from "react";
import FilteringComponent from "../components/productsView/mainComponents/FilteringComponent";
import ProductsSection from "../components/productsView/mainComponents/ProductsSection";
import { useNavigate } from "react-router-dom";
import { useSearchQueries } from "../hooks/searchQueries";
import { formatHelper } from "../utils/formatHelper";
import SearchBar from "../components/productsView/mainComponents/SearchBar";
import MobileFilterButton from "../components/productsView/filters/MobileFilterButton";
import { useLocation } from "react-router-dom";

function ProductsLayout() {
  const locationKey = useLocation().key;

  return (
    <>
      <section id="search" className="my-9">
        <div className="w-full px-4 flex items-center gap-2 mx-auto md:w-1/2 md:px-0">
          <SearchBar key={`${locationKey}`}></SearchBar>
          {/* only reason for putting the mobile filter Button here because if i edit the locationKey by using filters it closes mymodal because of the searchBar key 
          handler so either create  a search layout and then add a mobileButton and search bar which sounded illogical so it was best to put it here*/}
          <MobileFilterButton></MobileFilterButton>
        </div>
      </section>
      <section id="products-view" className="flex w-full h-full mb-14 gap-4">
        <div className="hidden md:block">
          <FilteringComponent></FilteringComponent>
        </div>
        <ProductsSection></ProductsSection>
      </section>
    </>
  );
}

export default ProductsLayout;
