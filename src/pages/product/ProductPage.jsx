import ProductSection from "../../components/productPageView/ProductSection";
import YouMightAlsoLike from "../../components/productPageView/YouMightAlsoLike";
import useProductView from "../../hooks/productView";

function ProductPage() {
  const { invariantProductData } = useProductView();
  return (
    <section id="product-page" className="flex flex-col gap-6">
      <ProductSection></ProductSection>
      <section className="product-description flex-grow flex-shrink ">
        <p className="w-fit mx-auto text-md font-bold border-b-2 border-b-primary-300 mb-6">
          Product Description
        </p>

        <div className="bg-[#EAEAEA4D] px-10 pt-10 pb-20 mb-4">
          {invariantProductData.isSuccess
            ? invariantProductData.data.description
            : ""}
        </div>
        <YouMightAlsoLike />
      </section>
    </section>
  );
}

export default ProductPage;
