import React from "react";
import Hero from "../../components/home/Hero";
import Banners from "../../components/home/Banners";
import Carousel from "../../components/home/Carousel";
export default function Home() {
  return (
    <div>
      <Hero />

      <Banners />
      <Carousel></Carousel>
    </div>
  );
}
