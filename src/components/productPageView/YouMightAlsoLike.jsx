import Heart from "../../assets/svgs/Heart";
import { randomImage } from "../../utils/plantsArray";
import HoverButton from "../buttons/HoverButton";
import CustomCarousel from "../home/CustomCarousel";
import HomeCardLayout from "../home/HomeCardLayout";

function YouMightAlsoLike() {
  const images = new Array(5).fill(null).map((_) => randomImage());

  return (
    <div className="mb-6">
      <p className="text-lg">You might also like</p>
      <CustomCarousel>
        {images.map((image, index) => {
          return (
            <HomeCardLayout key={index}>
              <HoverButton></HoverButton>
              <div>
                <img src={image} className="w-[150px] aspect-[3/4] mt-2 mb-4" />
              </div>
              <div className="mb-4 text-center self-center leading-[30px] text-[20px] ">
                <p>Rose</p>
                <p>{"8.00$"}</p>
              </div>
              <button className="absolute right-2 top-2">
                <Heart filled={false}></Heart>
              </button>
            </HomeCardLayout>
          );
        })}
      </CustomCarousel>
    </div>
  );
}

export default YouMightAlsoLike;
