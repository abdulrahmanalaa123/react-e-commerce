import flower1 from "../../assets/images/flower 1.png";
import flower2 from "../../assets/images/flower 2.png";
import flower3 from "../../assets/images/flower 3.png";
import flower4 from "../../assets/images/flower 4.png";

import CustomHeader from "./CustomHeader";
import HomeCardLayout from "./HomeCardLayout";
import CategoryCard from "./CategoryCard";
import CustomCarousel from "./CustomCarousel";

const categories = [
  { img: flower1, category: "OUTDOOR PLANTS" },
  { img: flower2, category: "HERBS" },
  { img: flower3, category: "FLOWERS" },
  { img: flower4, category: "INDOOR PLANTS" },
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
              ></CategoryCard>
            </HomeCardLayout>
          );
        })}
      </CustomCarousel>
    </div>
  );
}
