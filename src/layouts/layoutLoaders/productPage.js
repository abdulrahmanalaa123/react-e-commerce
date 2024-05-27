import checkIfProductExists from "../../utils/checkIfProductExists";
import queryDecoder from "../../utils/queryDecoder";
import { variationOptionsQuery } from "../../api/filters/getProductVariationOptions";
import { productQuery } from "../../api/product/getProductByVariation";

const productPageLoader =
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
    return null;
  };
export default productPageLoader;
