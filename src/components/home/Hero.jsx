import React from "react";
import HeroImage from "../../assets/images/hero.png";
import verticalHero from "../../assets/images/verticalHero.png";
import ReusableButton from "../ReusableButton";

const Hero = () => {
  return (
    <div className=" my-[60px]">
      <div className="items-center md:justify-between flex flex-wrap-reverse">
        {/* LEFT */}
        <div className="text-white max-w-full mt-6">
          {/* TITLE */}
          <h1 className="sm:text-3xl text-xl font-medium mb-4 text-text-300">
            OVER
            <span className="text-primary-300 font-bold mx-2">
              +500
            </span> PLANT <br />
            AT ONE PLACE
          </h1>
          {/* SLOGAN */}
          <p className="w-96 text-black text-base font-normal leading-normal mb-6 text-wrap max-w-full">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          {/* CTA BUTTON */}
          <ReusableButton
            text={"EXPLORE MORE"}
            onClick={() => {}}
          ></ReusableButton>
        </div>
        {/* RIGHT */}
        <div>
          <img
            src={verticalHero}
            alt="Mobile Hero Image"
            className="size-fit aspect-auto sm:hidden block"
          />
          <img
            src={HeroImage}
            alt="Hero Image"
            className="size-fit aspect-auto hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
