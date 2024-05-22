import { useProductVariationOptions } from "../api/filters/getProductVariationOptions";
import { useInvariantProduct } from "../api/product/getInvariantProduct";
import { useProduct } from "../api/product/getProductByVariation";
import { useSearchQueries } from "./searchQueries";
import { useLoaderData } from "react-router-dom";

// couldnt be applicable unless all products with variations should have a product_combination
// leaving it here as a reminder until i implement it in the databasse

// inside the useEffect
// if (currentProductFeatures.length !== Object.keys(variationOptions).length) {
//   throw "Sorry this product doesnt exit";
// }
function useProductView() {
  const { queryObj, params, bundledEditQueryKey, editQueryKey } =
    useSearchQueries();
  const variationOptions = useProductVariationOptions(params.productId);
  const invariantProductData = useInvariantProduct(params.productId);
  const productData = useProduct({
    productId: params.productId,
    queryObj,
  });

  const imagesEnabled =
    variationOptions.isSuccess &&
    productData.isSuccess &&
    invariantProductData.isSuccess;

  const currentProductFeatures = Object.keys(queryObj).length
    ? Object.values(queryObj).map((val) => val[0])
    : productData?.data?.combination_string?.split("-") ?? [];

  function getSelectedVariationIds() {
    if (variationOptions.isSuccess && productData.isSuccess) {
      const selectedVariationIds = Object.keys(variationOptions.data).map(
        (key) => {
          const id = variationOptions.data[key]
            .filter(({ value }) => {
              return currentProductFeatures.includes(value);
            })
            .map((val) => val?.id);
          return id;
        }
      );
      return selectedVariationIds.flat(1);
    } else {
      return [];
    }
  }

  const modifiedEditQueryVariation = (e, key, val) => {
    // first check option belongings of the rest of the vals
    if (e.target.checked) {
      const queriedOptions = Object.keys(queryObj);
      const currentOptions = Object.keys(variationOptions.data);
      if (
        queriedOptions.length !== currentOptions.length &&
        currentProductFeatures.length
      ) {
        const currentEntries = new Map(Object.entries(variationOptions.data));
        currentEntries.forEach((value, key, map) => {
          if (Array.isArray(value)) {
            const finalValue = value.filter((availableOptions) => {
              return currentProductFeatures.includes(availableOptions.value);
            });
            // this check shouldnt be reachable because you should have an option that is included
            // in the available options if not then it shouldnt even reach this stage ill put it right now
            // so it doesnt annoy me but it needs to be removed
            if (finalValue[0]?.value)
              map.set(key.toLowerCase(), finalValue[0].value);
            map.delete(key);
          }
        });

        currentEntries.set(key.toLowerCase(), val);

        const finalQueryKeys = [...currentEntries];

        bundledEditQueryKey(finalQueryKeys);
      } else {
        editQueryKey(key.toLowerCase(), val);
      }
    }
  };

  return {
    modifiedEditQueryVariation,
    currentProductFeatures,
    params,
    variationOptions,
    getSelectedVariationIds,
    productData,
    imagesEnabled,
    invariantProductData,
  };
}

export default useProductView;
