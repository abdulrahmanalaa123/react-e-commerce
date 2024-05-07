import { useEffect } from "react";
import FilteringComponent from "../components/productsView/mainComponents/FilteringComponent";
import ProductsSection from "../components/productsView/mainComponents/ProductsSection";
import { useNavigate } from "react-router-dom";
import { useSearchQueries } from "../hooks/searchQueries";
import { formatHelper } from "../utils/formatHelper";

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
      <section id="search">
        <button
          onClick={() => {
            navigate("/products/blalbal", { replace: true });
          }}
        >
          searchBar
        </button>
      </section>
      <section id="products-view" className="flex w-full h-full mb-14 gap-4">
        <FilteringComponent></FilteringComponent>
        <ProductsSection></ProductsSection>
      </section>
    </>
  );
}

export default ProductsLayout;
