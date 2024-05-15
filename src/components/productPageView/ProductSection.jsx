import { useCallback } from "react";
import { useProductVariationOptionsImages } from "../../api/filters/getProductVariationOptions";
import { useProduct } from "../../api/products/getProductByVariation";
import { useSearchQueries } from "../../hooks/searchQueries";
import ProductSelector from "./ProductSelector";
import SmallPhotosCarousel from "./SmallPhotoCarousel";

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
    if (Object.keys(queryObj).length) {
      return Object.values(queryObj).map((val) => val[0]);
    } else {
      return data.combination_string.split("-");
    }
  };

  const modifiedEditQueryVariation = (e, key, val) => {
    // first check option belongings of the rest of the vals
    if (e.target.checked) {
      const queriedOptions = Object.keys(queryObj);
      const currentOptions = Object.keys(variationData.distinct);
      const currentCheckBoxesValues = data.combination_string.split("-");
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
  return (
    <section
      id="product-view"
      className="flex flex-grow flex-shrink basis-3/4  gap-6"
    >
      <section
        id="image-gallery"
        className="w-1/2 z-0 flex-col flex flex-grow flex-shrink basis-3/4"
      >
        {variationSuccess && (
          <SmallPhotosCarousel>
            {[
              ...Object.values(variationData.images["Beige"]),
              ...Object.values(variationData.images["Green"]),
            ].map((image) => {
              return (
                <div className="h-full w-full">
                  <img src={image} alt="" className="object-contain" />
                </div>
              );
            })}
          </SmallPhotosCarousel>
        )}
        {variationSuccess && (
          <div>
            <SmallPhotosCarousel config={{ hasArrows: false }}>
              <div className="flex-grow w-[calc(100%-60px)] flex flex-nowrap">
                {[
                  ...Object.values(variationData.images["Beige"]),
                  ...Object.values(variationData.images["Green"]),
                ].map((image) => {
                  return (
                    <div className="h-[10vh] max-w-full w-[300px] justify-center items-center flex border-2 border-black">
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </SmallPhotosCarousel>
          </div>
        )}
      </section>
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
