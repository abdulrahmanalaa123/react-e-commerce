import React from "react";
import SvgArrow from "../../assets/svgs/Arrow";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    // 8:3 aspect ratio
    <div
      className={` w-full min-h-[480px] flex flex-col place-items-center justify-center gap-12 leading-10 text-center bg-banner bg-center bg-no-repeat px-8 py-[50%] sm:py-0`}
    >
      <p className="text-3xl text-white font-light italic">
        Want To Celebrate your special occasion? <br></br>check our gifts
        section
      </p>
      <Link
        to="/products"
        className="px-6 flex group gap-2 items-center justify-center py-2 min-w-min w-[240px] sm:w-[264px]
      bg-primary-200 transition-all duration-150 text-black text-base overflow-hidden hover:sm:w-[300px] hover:w-[260px] hover:py-4"
      >
        <p className="group-hover:animate-animateArrow mr-2">Check Now</p>
        <SvgArrow className="fill-black group-hover:animate-animateArrow"></SvgArrow>
      </Link>
    </div>
  );
}
