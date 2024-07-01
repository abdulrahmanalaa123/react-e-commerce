import CustomHeader from "./CustomHeader";
import HomeCardLayout from "./HomeCardLayout";
import CategoryCard from "./CategoryCard";
import CustomCarousel from "./CustomCarousel";

const categories = [
  {
    img: `${import.meta.env.VITE_IMAGE_BUCKET}/categories/outdoor.png`,
    subCategory: "Outdoor Plants",
    category: "Plants",
  },
  {
    img: `${import.meta.env.VITE_IMAGE_BUCKET}/categories/herbs.png`,
    subCategory: "Herbs",
    category: "Plants",
  },
  {
    img: `${import.meta.env.VITE_IMAGE_BUCKET}/categories/seeds.png`,
    subCategory: "Vegetable Seeds",
    category: "Seeds",
  },
  {
    img: `${import.meta.env.VITE_IMAGE_BUCKET}/categories/indoor.png`,
    subCategory: "Indoor Plants",
    category: "Plants",
  },
  {
    img: `${import.meta.env.VITE_IMAGE_BUCKET}/categories/flowers.png`,
    subCategory: "Flower Seeds",
    category: "Seeds",
  },
];
export default function CategoryCarousel() {
  return (
    <div>
      <CustomHeader text={"CATEGORIES"}></CustomHeader>
      <CustomCarousel>
        {categories.map((object, index) => {
          return (
            <HomeCardLayout key={index}>
              <CategoryCard
                img={object.img}
                category={object.category}
                subCategory={object.subCategory}
              ></CategoryCard>
            </HomeCardLayout>
          );
        })}
      </CustomCarousel>
    </div>
  );
}
