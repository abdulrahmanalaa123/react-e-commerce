import ProductImage from "../../../assets/images/product.png";
import Heart from "../../../assets/svgs/Heart";
import HoverButton from "../../buttons/HoverButton";

const product = {
  name: "Faded short sleeve variable",
  price: 8.0,
  image: ProductImage,
};
const ArrayofNulls = Array(16).fill(null);

function ProductsSection() {
  return (
    <section id="Products-Section" className="flex-auto">
      <p className="text-text-300 font-medium text-md mb-4">Results</p>
      <div className="w-full  h-full grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
        {ArrayofNulls.map((_, index) => (
          <div
            key={index}
            className="bg-backgrounds-cardsBg flex flex-col relative items-center justify-between py-2 "
          >
            <HoverButton></HoverButton>

            {/* design specifications idk if its a good design choice or a bad one */}
            <img src={product.image} className="max-w-[94px] max-h-[120px]" />
            <div className="text-center text-wrap w-[20ch] text-ellipsis">
              <p className="mb-4">{product.name}</p>
              <p>{`${product.price}.00$`}</p>
            </div>
            <button
              className="absolute right-2 top-2"
              onClick={() => {
                console.log("heart clicked");
              }}
            >
              <Heart></Heart>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductsSection;
