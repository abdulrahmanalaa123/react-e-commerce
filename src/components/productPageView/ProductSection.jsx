import { useCallback } from "react";
import { useProductVariationOptionsImages } from "../../api/filters/getProductVariationOptions";
import { useProduct } from "../../api/products/getProductByVariation";
import { useSearchQueries } from "../../hooks/searchQueries";
import ProductSelector from "./ProductSelector";
import SmallPhotosCarousel from "./SmallPhotoCarousel";
import "glider-js/glider.min.css";
import "./ProductSection.css";
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
      className="flex flex-col md:flex-row flex-grow flex-shrink basis-3/4  gap-6"
    >
      <section id="image-gallery" className="w-1/2 z-0 flex-col flex h-[480px]">
        {variationSuccess && (
          <SmallPhotosCarousel className="relative rounded-sm w-full h-full">
            {[
              ...Object.values(variationData.images["Beige"]),
              ...Object.values(variationData.images["Green"]),
            ].map((image) => {
              return (
                <div>
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-scale-down"
                  />
                </div>
              );
            })}
          </SmallPhotosCarousel>
        )}
        {variationSuccess && (
          <SmallPhotosCarousel
            config={{
              hasArrows: false,
              slidesToScroll: 2,
              slidesToShow: 2,
              responsive: [
                {
                  breakpoint: 864,
                  settings: {
                    slidesToShow: 5,
                  },
                },
                {
                  breakpoint: 764,
                  settings: {
                    slidesToShow: 3,
                  },
                },
              ],
            }}
            className="relative rounded-sm before:absolute before:inset-0 before:content-[''] before:pointer-events-none 
            before:bg-gradient-to-r before:from-[rgba(255,255,255,0.7)] before:from-0% before:via-transparent 
             before:to-[rgba(255,255,255,0.7)] before:to-100% before:z-10
             before:w-full before:h-full  h-min max-h-20 mt-6 max-w-full mx-8"
          >
            {[
              ...Object.values(variationData.images["Beige"]),
              ...Object.values(variationData.images["Green"]),
            ].map((image) => {
              return (
                <div className="w-full h-full mx-3 min-w-min px-0 ">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-scale-down"
                  />
                </div>
              );
            })}
          </SmallPhotosCarousel>
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
