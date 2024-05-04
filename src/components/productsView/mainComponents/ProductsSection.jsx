import ProductImage from "../../../assets/images/product.png";
import Heart from "../../../assets/svgs/Heart";
import GoArrow from "../../../assets/svgs/goToPage.svg";

const product = {
  name: "Faded short sleeve variable",
  price: 8.0,
  image: ProductImage,
};
const ArrayofNulls = Array(16).fill(null);
function ProductsSection() {
  console.log("ProductsSection rendered");
  return (
    <section id="Products-Section" className="flex-auto">
      <p className="text-text-300 font-medium text-md mb-4">Results</p>
      <div className="w-full  h-full grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
        {ArrayofNulls.map((_, index) => (
          <div
            key={index}
            className="bg-backgrounds-cardsBg flex flex-col relative items-center justify-between py-8 "
          >
            <div
              className="group absolute top-0 left-0 hover:bg-[#00000026] w-full h-full cursor-pointer"
              onClick={() => {
                console.log("div clicked");
              }}
            >
              <img
                src={GoArrow}
                className="hidden group-hover:block absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto "
              />
            </div>
            <img src={product.image} className="max-w-[110px] max-h-[140px]" />
            <div className="text-center text-wrap w-[20ch] text-ellipsis">
              <p>{product.name}</p>
              <p className="mt-4">{`${product.price}.00$`}</p>
            </div>
            <button
              className="absolute right-2 top-2 "
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
