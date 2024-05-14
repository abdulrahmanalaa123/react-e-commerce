import { useProductVariationOptionsImages } from "../../api/filters/getProductVariationOptions";
import { useProduct } from "../../api/products/getProductByVariation";
import { useSearchQueries } from "../../hooks/searchQueries";
import ProductSelector from "./ProductSelector";

function ProductSection() {
  const { queryObj, params } = useSearchQueries();

  const { data: variationData, isSuccess: variationSuccess } =
    useProductVariationOptionsImages(params.productId);
  const { data, isSuccess, isError } = useProduct({
    productId: params.productId,
  });
  return (
    <section
      id="product-view"
      className="flex flex-grow flex-shrink basis-3/4 flex-wrap gap-6"
    >
      <section id="image-gallery" className="flex-auto bg-black">
        hello
      </section>
      {variationSuccess && isSuccess && (
        <ProductSelector
          variations={variationData.distinct}
          data={data}
        ></ProductSelector>
      )}
    </section>
  );
}

export default ProductSection;
