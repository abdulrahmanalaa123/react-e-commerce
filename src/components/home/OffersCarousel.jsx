import CardLayout from "./CardLayout";
import CustomHeader from "./CustomHeader";
import offerFlower from "../../assets/images/OfferFlower.png";
import Heart from "../../assets/svgs/Heart";
import { useState } from "react";
import CustomCarousel from "./CustomCarousel";
import SvgArrow from "../../assets/svgs/Arrow";
import {
  allProductsPaginated,
  categoryPaginated,
  getByOptionValue,
  getByPriceRange,
  subCategoryPaginated,
} from "../../api/proudcts/products";

function BeginnersCarousel() {
  const [filledIndex, SetFilledIndex] = useState(null);
  return (
    <>
      <CustomHeader text={"SPECIAL OFFERS"}></CustomHeader>
      {/* should be lInk but ill use button for the sake of not breaking */}
      <button
        className="ml-auto flex items-center mb-2"
        onClick={() => {
          subCategoryPaginated({
            subCategory: "Vegetable Seeds",
            pageNo: 1,
            pagesCount: 10,
          });
          getByOptionValue({ optionValue: "Small", pageNo: 1, pagesCount: 10 });
          getByPriceRange({ range: [150, 300], pageNo: 1, pagesCount: 10 });
        }}
      >
        <span>View All</span>
        <SvgArrow className="fill-black inline-block ml-2"></SvgArrow>
      </button>
      <CustomCarousel>
        {new Array(4).fill(null).map((_, index) => {
          return (
            <CardLayout key={index}>
              <div>
                <img
                  src={offerFlower}
                  className="w-[150px] aspect-[3/4] mt-2 mb-4"
                />
              </div>
              <div className="mb-4 text-center leading-[30px] text-[20px] ">
                <p>Price</p>
                <p>{"8.00$"}</p>
              </div>
              <button
                className="absolute right-2 top-2 "
                onClick={() => {
                  SetFilledIndex(index);
                }}
              >
                <Heart filled={filledIndex === index}></Heart>
              </button>
            </CardLayout>
          );
        })}
      </CustomCarousel>
    </>
  );
}

export default BeginnersCarousel;
