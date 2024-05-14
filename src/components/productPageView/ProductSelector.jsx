import ColorCheckBox from "../productsView/checkBoxes/ColorCheckBox";
import NamedBoxCheckBox from "../productsView/checkBoxes/NamedBoxCheckBox";
// redunduncy of repeating the same variation Options component but remember avoid hasty abstractions need to figure out a good abstraction
// that doesnt fuck up my logic ill keep it wet here first then apply dry later
function ProductSelector({
  variations,
  data,
  valsToMatch,
  modifiedEditQueryVariation,
}) {
  return (
    <section
      id="variation-selector"
      className="flex-auto bg-[#F6F9F5] p-4 flex flex-col gap-6 h-min"
    >
      <p className="font-medium text-md p-2">{data.name.toUpperCase()}</p>
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
        <p>Category</p> <p className="font-medium text-md">{data.category}</p>
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
//   <div
//     id="default-carousel"
//     className="relative w-full"
//     data-carousel="slide"
//   >
//     <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//       <div className=" duration-700 ease-in-out" data-carousel-item>
//         <img
//           src={banner}
//           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//           alt="..."
//         ></img>
//       </div>
//       <div className="hidden duration-700 ease-in-out" data-carousel-item>
//         <img
//           src={flower1}
//           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//           alt="..."
//         ></img>
//       </div>
//       <div className="hidden duration-700 ease-in-out" data-carousel-item>
//         <img
//           src={flower2}
//           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//           alt="..."
//         ></img>
//       </div>
//       <div className="hidden duration-700 ease-in-out" data-carousel-item>
//         <img
//           src={flower3}
//           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//           alt="..."
//         ></img>
//       </div>
//       <div className="hidden duration-700 ease-in-out" data-carousel-item>
//         <img
//           src={flower4}
//           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//           alt="..."
//         ></img>
//       </div>
//     </div>
//     <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
//       <button
//         type="button"
//         className="w-3 h-3 inline-block rounded-full"
//         aria-current="true"
//         aria-label="Slide 1"
//         data-carousel-slide-to="0"
//       ></button>
//       <button
//         type="button"
//         className="w-3 h-3 inline-block rounded-full"
//         aria-current="false"
//         aria-label="Slide 2"
//         data-carousel-slide-to="1"
//       ></button>
//       <button
//         type="button"
//         className="w-3 h-3 inline-block rounded-full"
//         aria-current="false"
//         aria-label="Slide 3"
//         data-carousel-slide-to="2"
//       ></button>
//       <button
//         type="button"
//         className="w-3 h-3 inline-block rounded-full"
//         aria-current="false"
//         aria-label="Slide 4"
//         data-carousel-slide-to="3"
//       ></button>
//       <button
//         type="button"
//         className="w-3 h-3 inline-block rounded-full"
//         aria-current="false"
//         aria-label="Slide 5"
//         data-carousel-slide-to="4"
//       ></button>
//     </div>
//     <button
//       type="button"
//       className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//       data-carousel-prev
//     >
//       <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//         <svg
//           className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 6 10"
//         >
//           <path
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="M5 1 1 5l4 4"
//           />
//         </svg>
//         <span className="sr-only">Previous</span>
//       </span>
//     </button>
//     <button
//       type="button"
//       className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//       data-carousel-next
//     >
//       <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//         <svg
//           className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 6 10"
//         >
//           <path
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="m1 9 4-4-4-4"
//           />
//         </svg>
//         <span className="sr-only">Next</span>
//       </span>
//     </button>
//   </div>
