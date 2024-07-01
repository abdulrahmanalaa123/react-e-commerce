import HomeCardLayout from "./HomeCardLayout";
import CustomHeader from "./CustomHeader";
import Heart from "../../assets/svgs/Heart";
import { useState } from "react";
import CustomCarousel from "./CustomCarousel";
import SvgArrow from "../../assets/svgs/Arrow";
import { useNavigate } from "react-router-dom";
import { randomImage } from "../../utils/plantsArray";

function OffersCarousel({ text }) {
  const images = new Array(5).fill(null).map((_) => randomImage());

  const [filledIndex, SetFilledIndex] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="mb-28">
      <CustomHeader text={text}></CustomHeader>
      {/* should be lInk but ill use button for the sake of not breaking */}
      <button className="ml-auto flex items-center mb-2" onClick={() => {}}>
        <span
          onClick={() => {
            window.scrollTo(0, 100);
            navigate("/products");
          }}
        >
          View All
        </span>
        <SvgArrow className="fill-black inline-block ml-2"></SvgArrow>
      </button>
      <CustomCarousel>
        {images.map((image, index) => {
          return (
            <HomeCardLayout key={index}>
              <div>
                <img src={image} className="w-[150px] aspect-[3/4] mt-2 mb-4" />
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
