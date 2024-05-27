import ProductSection from "../../components/productPageView/ProductSection";

function ProductPage() {
  return (
    <section id="product-page" className="flex flex-col ">
      <ProductSection></ProductSection>
      <section className="product-description flex-grow flex-shrink basis-1/4"></section>
    </section>
  );
}

export default ProductPage;
