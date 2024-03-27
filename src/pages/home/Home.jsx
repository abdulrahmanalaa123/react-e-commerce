import React from "react";
import Hero from "../../components/home/Hero";
import Banners from "../../components/home/Banners";
import CategoryCarousel from "../../components/home/CategoryCarousel";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />

      <Banners />
      <CategoryCarousel></CategoryCarousel>
    </div>
  );
}
