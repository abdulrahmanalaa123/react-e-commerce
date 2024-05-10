import { useEffect } from "react";
import FilteringComponent from "../components/productsView/mainComponents/FilteringComponent";
import ProductsSection from "../components/productsView/mainComponents/ProductsSection";
import { useNavigate } from "react-router-dom";
import { useSearchQueries } from "../hooks/searchQueries";
import { formatHelper } from "../utils/formatHelper";
import SearchBar from "../components/productsView/mainComponents/SearchBar";

function ProductsLayout() {
  const navigate = useNavigate();
  const { params, locationKey } = useSearchQueries();
  useEffect(() => {
    if (
      params.category !== undefined &&
      !formatHelper["category"](params.category)
    ) {
      // can be replaced by throwing an error and making a fallback component which reroutes to the home screen or the products page
      // which is better for UX and not error prone like this method
      console.log("boys we're going on a ride");
      navigate("/products", { replace: true });
    }
  }, [params.category]);
  return (
    <>
      <section id="search" className="my-9">
        <SearchBar key={`${locationKey}`}></SearchBar>
      </section>
      <section id="products-view" className="flex w-full h-full mb-14 gap-4">
        <div>
          <FilteringComponent></FilteringComponent>
        </div>
        <ProductsSection></ProductsSection>
      </section>
    </>
  );
}

export default ProductsLayout;
