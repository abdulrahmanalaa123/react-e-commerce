import HomeCardLayout from "./HomeCardLayout";
import CustomHeader from "./CustomHeader";
import offerFlower from "../../assets/images/OfferFlower.png";
import Heart from "../../assets/svgs/Heart";
import { useState } from "react";
import CustomCarousel from "./CustomCarousel";
import SvgArrow from "../../assets/svgs/Arrow";
import HoverButton from "../buttons/HoverButton";
import { useNavigate } from "react-router-dom";

function OffersCarousel({ text }) {
  const [filledIndex, SetFilledIndex] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="mb-28">
      <CustomHeader text={text}></CustomHeader>
      {/* should be lInk but ill use button for the sake of not breaking */}
      <button className="ml-auto flex items-center mb-2" onClick={() => {}}>
        <span>View All</span>
        <SvgArrow className="fill-black inline-block ml-2"></SvgArrow>
      </button>
      <CustomCarousel>
        {new Array(4).fill(null).map((_, index) => {
          return (
            <HomeCardLayout key={index}>
              <HoverButton
                onClick={() => {
                  window.scrollTo(0, 100);
                  navigate("/products");
                }}
              ></HoverButton>

              <div>
                <img
                  src={offerFlower}
                  className="w-[150px] aspect-[3/4] mt-2 mb-4"
                />
              </div>
              <div className="mb-4 text-center leading-[30px] text-[20px] ">
                <p>Rose</p>
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
            </HomeCardLayout>
          );
        })}
      </CustomCarousel>
    </div>
  );
}

export default OffersCarousel;
