import { getProducts } from "../api/products/getProducts";
import FilteringComponent from "../components/productsView/mainComponents/FilteringComponent";
import ProductsSection from "../components/productsView/mainComponents/ProductsSection";

function ProductsLayout() {
  return (
    <>
      <section id="search">
        <button
          onClick={() => {
            console.log("testing");
            console.log(
              getProducts({
                category: ["Seeds"],
                subcategory: ["Vegetable Seeds"],
              })
            );
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
