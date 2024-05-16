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
    const val = data?.combination_string?.split("-");
    return val;
  };

  const modifiedEditQueryVariation = (e, key, val) => {
    // first check option belongings of the rest of the vals
    if (e.target.checked) {
      const queriedOptions = Object.keys(queryObj);
      const currentOptions = Object.keys(variationData.distinct);
      const currentCheckBoxesValues = returnValsToMatch();
      if (queriedOptions.length !== currentOptions.length) {
        const currentEntries = Object.entries(variationData.distinct).reduce(
          (accum, entry) => {
            const filteredVals = entry[1].filter((val) =>
              currentCheckBoxesValues.includes(val)
            );

            return entry[0].toLowerCase() !== key
              ? [...accum, [entry[0].toLowerCase(), ...filteredVals]]
              : accum;
          },
          []
        );

        const finalQueryKeys = [...currentEntries, [key, val]];
        console.log(finalQueryKeys);
        bundledEditQueryKey(finalQueryKeys);
      } else {
        editQueryKey(key, val);
      }
    }
  };

  const returnCurrentImageGall = () => {
    const currentOptions = returnValsToMatch();
    const availableGalleries = Object.keys(variationData.images).filter((key) =>
      currentOptions.includes(key)
    );

    if (availableGalleries.length) {
      console.log(Object.values(variationData.images[availableGalleries[0]]));
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
