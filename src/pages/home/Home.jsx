import React from "react";
import Hero from "../../components/home/Hero";
import Banner from "../../components/home/Banner";
import CategoryCarousel from "../../components/home/CategoryCarousel";
import transparentLogo from "../../assets/svgs/transparentLogo.svg";
import BeginnersCarousel from "../../components/home/BeginnersCarousel";
import OffersCarousel from "../../components/home/OffersCarousel";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />

      <Banner />
      <CategoryCarousel></CategoryCarousel>
      <img src={transparentLogo} alt="" className="my-10 mx-auto" />
      <BeginnersCarousel></BeginnersCarousel>
      <OffersCarousel></OffersCarousel>
    </div>
  );
}
