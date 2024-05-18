import ColorCheckBox from "../productsView/checkBoxes/ColorCheckBox";
import NamedBoxCheckBox from "../productsView/checkBoxes/NamedBoxCheckBox";

// redunduncy of repeating the same variation Options component but remember avoid hasty abstractions need to figure out a good abstraction
// that doesnt fuck up my logic ill keep it wet here first then apply dry later
function ProductSelector({
  variations,
  data,
  invariantData,
  valsToMatch,
  modifiedEditQueryVariation,
}) {
  return (
    <section
      id="variation-selector"
      className="flex-auto md:w-1/2 bg-[#F6F9F5] p-4 flex flex-col gap-6 h-min z-10"
    >
      <p className="font-medium text-md p-2">{invariantData.name}</p>
      <p className="font-medium text-md p-2">{`${data.price}.00$`}</p>

      {Object.keys(variations).map((key) => {
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
                {variations[key].map((val) => {
                  if (normalizedKey === "color") {
                    return (
                      <ColorCheckBox
                        paramKey={normalizedKey}
                        // 3 underscores used because naming of the element ids inside is with a dash
                        // so no confusion happens if it can even happen that ids can interefere with component keys in react while i think it doesnt
                        key={`${normalizedKey}___${val}`}
                        name={val}
                        state={valsToMatch().includes(val)}
                        editSearchParams={modifiedEditQueryVariation}
                      ></ColorCheckBox>
                    );
                  } else {
                    return (
                      <NamedBoxCheckBox
                        paramKey={normalizedKey}
                        // 3 underscores used because naming of the element ids inside is with a dash
                        // so no confusion happens if it can even happen that ids can interefere with component keys in react while i think it doesnt
                        key={`${normalizedKey}___${val}`}
                        name={val}
                        state={valsToMatch().includes(val)}
                        editSearchParams={modifiedEditQueryVariation}
                      ></NamedBoxCheckBox>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-between items-center p-2">
        <p>Category</p>
        <p className="font-medium text-md">{invariantData.category}</p>
      </div>
      <div className="flex justify-between items-center p-2 h-min">
        <p>Quantity</p>
        <div className="flex items-stretch justify-center gap-[1px] self-stretch">
          <button className="bg-text-300 hover:bg-primary-200 text-white hover:text-text-300 duration-150 transition-colors px-3 font-bold text-xl">
            <svg
              width={16}
              height={4}
              viewBox="0 0 16 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.99992 2.66671H13.9999C14.3681 2.66671 14.6666 2.36823 14.6666 2.00004C14.6666 1.63185 14.3681 1.33337 13.9999 1.33337H1.99992C1.63173 1.33337 1.33325 1.63185 1.33325 2.00004C1.33325 2.36823 1.63173 2.66671 1.99992 2.66671Z"
                fill="white"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="bg-text-300 hover:bg-primary-200 text-white hover:text-text-300 duration-150 transition-colors px-4 py-[0.4rem] font-medium text-md">
            1
          </button>
          <button className="bg-text-300 hover:bg-primary-200 text-white hover:text-text-300 duration-150 transition-colors px-3 font-bold text-xl">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.33325 7.33337V2.00004C7.33325 1.63185 7.63173 1.33337 7.99992 1.33337C8.36811 1.33337 8.66659 1.63185 8.66659 2.00004V7.33337H13.9999C14.3681 7.33337 14.6666 7.63185 14.6666 8.00004C14.6666 8.36823 14.3681 8.66671 13.9999 8.66671H8.66659V14C8.66659 14.3682 8.36811 14.6667 7.99992 14.6667C7.63173 14.6667 7.33325 14.3682 7.33325 14V8.66671H1.99992C1.63173 8.66671 1.33325 8.36823 1.33325 8.00004C1.33325 7.63185 1.63173 7.33337 1.99992 7.33337H7.33325Z"
                fill="white"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <button className="w-full bg-text-300 hover:bg-primary-200 py-4 px-6 transition-colors rounded-sm duration-150 font-medium text-white hover:text-text-300">
        ADD TO CART
      </button>
    </section>
  );
}

export default ProductSelector;
