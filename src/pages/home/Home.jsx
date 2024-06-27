import React from "react";
import Hero from "../../components/home/Hero";
import Banner from "../../components/home/Banner";
import CategoryCarousel from "../../components/home/CategoryCarousel";
import transparentLogo from "../../assets/svgs/transparentLogo.svg";
import BeginnersCarousel from "../../components/home/BeginnersCarousel";
import OffersCarousel from "../../components/home/OffersCarousel";
import { createSearchParams, useSearchParams } from "react-router-dom";
import SuccessModal from "../../components/modals/SuccessModal";
export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  function clearSearchQueries() {
    setSearchParams(createSearchParams({}), { replace: true });
  }
  return (
    <div className="overflow-hidden">
      <Hero />
      <SuccessModal
        open={searchParams.get("status") === "success"}
        clearSearchParams={clearSearchQueries}
      ></SuccessModal>

      <Banner />
      <CategoryCarousel></CategoryCarousel>
      <img src={transparentLogo} alt="" className="my-10 mx-auto" />
      <BeginnersCarousel></BeginnersCarousel>
      <OffersCarousel></OffersCarousel>
    </div>
  );
}
