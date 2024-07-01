import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="mt-[60px] sm:mb-[60px] mb-8">
      <div className="items-center md:justify-between flex flex-wrap-reverse">
        {/* LEFT */}
        <div className="text-white max-w-full mt-6 flex flex-col items-start gap-2">
          {/* TITLE */}
          <h1 className="sm:text-3xl text-xl font-medium mb-2 text-text-300">
            OVER
            <span className="text-primary-300 font-bold mx-2">
              +500
            </span> PLANT <br />
            AT ONE PLACE
          </h1>
          {/* SLOGAN */}
          <p className="w-96 text-black text-base font-normal mb-4 text-wrap max-w-full">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <div>
            <Link
              to="/products"
              className="px-6 py-4 disabled:bg-text-200 bg-text-300 text-white hover:bg-primary-200 transition-colors duration-150 hover:text-text-300 w-64 max-w-full rounded-sm"
            >
              EXPLORE MORE
            </Link>
          </div>
        </div>
        {/* RIGHT */}
        <img
          src={`${import.meta.env.VITE_IMAGE_BUCKET}/home/hero.png`}
          alt="Hero Image"
          className="aspect-auto sm:aspect-[2/1.8] sm:object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
