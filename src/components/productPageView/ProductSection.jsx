import { useCallback, useState } from "react";
import { useProductVariationOptionsImages } from "../../api/filters/getProductVariationOptions";
import { useProduct } from "../../api/products/getProductByVariation";
import { useSearchQueries } from "../../hooks/searchQueries";
import ProductSelector from "./ProductSelector";
import ImageGallery from "./ImageGallery";
function ProductSection() {
  const { queryObj, params, bundledEditQueryKey, editQueryKey } =
    useSearchQueries();

  const { data: variationData, isSuccess: variationSuccess } =
    useProductVariationOptionsImages(params.productId);
  const { data, isSuccess, isError } = useProduct({
    productId: params.productId,
    queryObj,
  });

  const returnValsToMatch = () => {
    // they will always be the same but supposing and could just always use combination string
    const val = data?.combination_string?.split("-") ?? [];
    return val;
  };

  // must usecallback because of the memoization of components as well as it beign called everywhere
  // in the nested tree
  const modifiedEditQueryVariation = useCallback(
    (e, key, val) => {
      // first check option belongings of the rest of the vals
      if (e.target.checked) {
        const queriedOptions = Object.keys(queryObj);
        const currentOptions = Object.keys(variationData.distinct);
        const currentCheckBoxesValues = new Set(returnValsToMatch());
        if (queriedOptions.length !== currentOptions.length) {
          const newCurrentEntries = new Map(
            Object.entries(variationData.distinct)
          );
          newCurrentEntries.forEach((value, key, map) => {
            console.log("value is:", value);
            if (Array.isArray(value)) {
              const finalValue = value.filter((availableOptions) =>
                currentCheckBoxesValues.has(availableOptions)
              );
              map.set(key.toLowerCase(), ...finalValue);
              map.delete(key);
            }
          });
          newCurrentEntries.set(key, val);

          const finalQueryKeys = [...newCurrentEntries];

          bundledEditQueryKey(finalQueryKeys);
        } else {
          editQueryKey(key, val);
        }
      }
    },
    [JSON.stringify(queryObj), JSON.stringify(returnValsToMatch())]
  );

  const returnCurrentImageGall = () => {
    const currentOptions = returnValsToMatch();
    const availableGalleries = Object.keys(variationData.images).filter((key) =>
      currentOptions.includes(key)
    );

    if (availableGalleries.length) {
      return Object.values(variationData.images[availableGalleries[0]]);
    }
    return [data.baseImage];
  };

  return (
    <section
      id="product-view"
      className="flex flex-col md:flex-row flex-grow flex-shrink basis-3/4  gap-6"
    >
      {variationSuccess && isSuccess && (
        <ImageGallery images={returnCurrentImageGall()}></ImageGallery>
      )}
      {variationSuccess && isSuccess && (
        <ProductSelector
          variations={variationData.distinct}
          data={data}
          valsToMatch={returnValsToMatch}
          modifiedEditQueryVariation={modifiedEditQueryVariation}
        ></ProductSelector>
      )}
    </section>
  );
}

export default ProductSection;
