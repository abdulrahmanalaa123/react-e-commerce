import FilteringComponent from "../../components/productsView/mainComponents/FilteringComponent";
import ProductsSection from "../../components/productsView/mainComponents/ProductsSection";
function ProductsPage() {
  return (
    <section id="products-view" className="flex w-full h-full mb-14 gap-4">
      <div className="hidden md:block">
        <FilteringComponent></FilteringComponent>
      </div>
      <ProductsSection></ProductsSection>
    </section>
  );
}

export default ProductsPage;
