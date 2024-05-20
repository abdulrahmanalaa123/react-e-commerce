import { variationOptionsQuery } from "../api/filters/getProductVariationOptions";
import { productQuery } from "../api/product/getProductByVariation";
import ProductSection from "../components/productPageView/ProductSection";
import checkIfProductExists from "../utils/checkIfProductExists";
import queryDecoder from "../utils/queryDecoder";

function ProductPageLayout() {
  return (
    <section id="product-page" className="flex flex-col min-h-screen">
      <ProductSection></ProductSection>
      <section className="product-description flex-grow flex-shrink basis-1/4"></section>
    </section>
  );
}

export default ProductPageLayout;

export const productPageLoader =
  (queryClient) =>
  async ({ params, request }) => {
    const queryObject = queryDecoder(new URL(request.url).searchParams);
    const variationOptions = await queryClient.ensureQueryData(
      variationOptionsQuery(params.productId)
    );
    const productData = await queryClient.ensureQueryData(
      productQuery({ queryObj: queryObject, productId: params.productId })
    );
    const currentProductFeatures = Object.keys(queryObject).length
      ? Object.values(queryObject).map((val) => val[0])
      : productData?.data?.combination_string?.split("-") ?? [];
    checkIfProductExists(variationOptions, currentProductFeatures);
    return { currentProductFeatures };
  };
