import ProductSection from "../components/productPageView/ProductSection";

function ProductPageLayout() {
  return (
    <section id="product-page" className="flex flex-col min-h-screen">
      <ProductSection></ProductSection>
      <section className="product-description flex-grow flex-shrink basis-1/4"></section>
    </section>
  );
}

export default ProductPageLayout;
