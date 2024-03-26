import React from "react";
import SvgArrow from "../../assets/svgs/Arrow";
export default function Banners() {
  return (
    <div className=" w-full min-h-[480px] flex flex-col place-items-center justify-center gap-12 leading-10 text-center bg-banner-image bg-center bg-no-repeat px-8 bg-fixed">
      <p className="text-3xl text-white font-light italic">
        Want To Celebrate your special occasion? <br></br>check our gifts
        section
      </p>
      <button
        className="px-6 flex group gap-2 items-center justify-center py-4 min-w-min w-[240px] sm:w-[264px]
      bg-primary-200 transition-all duration-150 text-black text-base overflow-hidden hover:sm:w-[300px] hover:w-[260px] hover:py-6"
      >
        <p className="group-hover:animate-animateArrow">Check Now </p>
        <SvgArrow className="fill-black group-hover:animate-animateArrow"></SvgArrow>
      </button>
    </div>
  );
}
