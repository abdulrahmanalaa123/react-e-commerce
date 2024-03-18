import React from "react";
import HeroImage from "../../assets/images/hero.png";

const Hero = () => {
  return (
    <div className="mx-auto my-[60px] container">
      <div className="lg:flex lg:items-center lg:justify-between">
        {/* LEFT */}
        <div>
          <div className="text-white">
            {/* TITLE */}
            <h1 className="text-3xl font-medium mb-4 text-text-300">
              OVER
              <span className="text-primary-300 font-bold mx-2">+500</span>{" "}
              PLANT <br />
              AT ONE PLACE
            </h1>
            {/* SLOGAN */}
            <p className="w-96 text-black text-base font-normal leading-normal mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            {/* CTA BUTTON */}
            <button className="w-64 h-14 px-6 py-4 bg-text-300 hover:text-text-300 rounded-sm hover:bg-primary-200 flex-col justify-center items-center gap-2 inline-flex">
              EXPLORE MORE
            </button>
          </div>
        </div>
        {/* RIGHT */}
        <div className="mt-8 lg:mt-0 h-[418px]">
          <img src={HeroImage} alt="Hero Image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
