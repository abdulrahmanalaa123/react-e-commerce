import ContentLoader from "react-content-loader";
import useProductView from "../../hooks/productView";
import ColorCheckBox from "../productsView/checkBoxes/ColorCheckBox";
import NamedBoxCheckBox from "../productsView/checkBoxes/NamedBoxCheckBox";

function FilteringOptions() {
  const {
    variationOptions: variations,
    currentProductFeatures,
    modifiedEditQueryVariation,
  } = useProductView();
  return variations.isSuccess ? (
    Object.keys(variations.data).map((key) => {
      // key is normalized because database data in Caps and my function inputs are all lowerCase
      const normalizedKey = key.toLowerCase();

      return (
        <div
          id={`${normalizedKey}-filter`}
          key={`${normalizedKey}`}
          className="w-full"
        >
          {/* normal key is used because its capitalized */}
          <div className="flex justify-between items-center p-2">
            <p>{key}</p>
            <div className="flex flex-wrap gap-4 items-center">
              {variations.data[key].map(({ value }) => {
                if (normalizedKey === "color") {
                  return (
                    <ColorCheckBox
                      paramKey={normalizedKey}
                      // 3 underscores used because naming of the element ids inside is with a dash
                      // so no confusion happens if it can even happen that ids can interefere with component keys in react while i think it doesnt
                      key={`${normalizedKey}___${value}`}
                      name={value}
                      state={currentProductFeatures.includes(value)}
                      editSearchParams={modifiedEditQueryVariation}
                    ></ColorCheckBox>
                  );
                } else {
                  return (
                    <NamedBoxCheckBox
                      paramKey={normalizedKey}
                      // 3 underscores used because naming of the element ids inside is with a dash
                      // so no confusion happens if it can even happen that ids can interefere with component keys in react while i think it doesnt
                      key={`${normalizedKey}___${value}`}
                      name={value}
                      state={currentProductFeatures.includes(value)}
                      editSearchParams={modifiedEditQueryVariation}
                    ></NamedBoxCheckBox>
                  );
                }
              })}
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <ContentLoader
      speed={1}
      width={600}
      height={70}
      viewBox="0 0 600 70"
      backgroundColor="#ecffe0"
      foregroundColor="#c7dab9"
      className="w-full"
    >
      <rect x="6" y="11" rx="3" ry="3" width="410" height="20" />
      <rect x="6" y="45" rx="3" ry="3" width="410" height="20" />
    </ContentLoader>
  );
}

export default FilteringOptions;
