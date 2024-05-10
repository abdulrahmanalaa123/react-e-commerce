import { useEffect } from "react";
import FilteringComponent from "../components/productsView/mainComponents/FilteringComponent";
import ProductsSection from "../components/productsView/mainComponents/ProductsSection";
import { useNavigate } from "react-router-dom";
import { useSearchQueries } from "../hooks/searchQueries";
import { formatHelper } from "../utils/formatHelper";
import SearchBar from "../components/productsView/mainComponents/SearchBar";
function ProductsLayout() {
  const navigate = useNavigate();
  const { params } = useSearchQueries();
  useEffect(() => {
    if (
      params.category !== undefined &&
      !formatHelper["category"](params.category)
    ) {
      // can be replaced by throwing an error and
      console.log("boys we're going on a ride");
      navigate("/products", { replace: true });
    }
  }, [params.category]);
  return (
    <>
      <section id="search" className="my-9">
        {/* must have a key to determine if it needs to reset states which is through transitions */}
        <SearchBar
          key={`${
            params.category !== undefined ? params.category : "AllSearchBar"
          }`}
        ></SearchBar>
      </section>
      <section id="products-view" className="flex w-full h-full mb-14 gap-4">
        <FilteringComponent></FilteringComponent>
        <ProductsSection></ProductsSection>
      </section>
    </>
  );
}

export default ProductsLayout;
