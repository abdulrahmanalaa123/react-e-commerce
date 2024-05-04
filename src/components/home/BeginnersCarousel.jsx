import CardLayout from "./HomeCardLayout";
import CustomHeader from "./CustomHeader";
import offerFlower from "../../assets/images/OfferFlower.png";
import Heart from "../../assets/svgs/Heart";
import { useState } from "react";
import CustomCarousel from "./CustomCarousel";
import SvgArrow from "../../assets/svgs/Arrow";
import GoArrow from "../../assets/svgs/goToPage.svg";

function OffersCarousel() {
  const [filledIndex, SetFilledIndex] = useState(null);
  return (
    <>
      <CustomHeader text={"BEGINNERS CHOICE"}></CustomHeader>
      {/* should be lInk but ill use button for the sake of not breaking */}
      <button className="ml-auto flex items-center mb-2">
        <span>View All</span>
        <SvgArrow className="fill-black inline-block ml-2"></SvgArrow>
      </button>
      <CustomCarousel>
        {new Array(4).fill(null).map((_, index) => {
          return (
            <CardLayout key={index}>
              <div
                className="group absolute top-0 left-0 hover:bg-[#00000026] w-full h-full cursor-pointer"
                onClick={() => {
                  console.log("div clicked");
                }}
              >
                <img
                  src={GoArrow}
                  className="hidden group-hover:block absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto "
                />
              </div>
              <div>
                <img
                  src={offerFlower}
                  className="w-[150px] aspect-[3/4] mt-2 mb-4"
                />
              </div>
              <div className="mb-4 text-center self-center leading-[30px] text-[20px] ">
                <p>Rose</p>
                <p>{"8.00$"}</p>
              </div>
              <button
                className="absolute right-2 top-2"
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

export default OffersCarousel;
