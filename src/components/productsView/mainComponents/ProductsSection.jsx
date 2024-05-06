import { useProducts } from "../../../api/products/getProducts";
import ProductImage from "../../../assets/images/product.png";
import Heart from "../../../assets/svgs/Heart";
import { useSearchQueries } from "../../../hooks/searchQueries";
import HoverButton from "../../buttons/HoverButton";

const product = {
  image: ProductImage,
};

function ProductsSection() {
  const { getQueryObject, params } = useSearchQueries();

  const { data, error, isError, isLoading, isFetching, isSuccess } =
    useProducts({
      category: params.category,
      queryObject: getQueryObject(),
    });
  return (
    <section id="Products-Section" className="flex-auto">
      <p className="text-text-300 font-medium text-md mb-4">Results</p>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,max-content))] grid-rows-[repeat(auto-fit,minmax(240px,min-content))] sm:grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
        {isSuccess ? (
          data.map((element, index) => (
            <div
              key={index}
              className="bg-backgrounds-cardsBg flex flex-col relative items-center justify-center gap-2 py-2 "
            >
              <HoverButton></HoverButton>
              {/* UI on the image responsiveness needs work  */}
              {/* design specifications idk if its a good design choice or a bad one */}
              <img src={product.image} className="max-w-[94px] max-h-[120px]" />
              <p className="text-center text-wrap w-[20ch] text-ellipsis overflow-clip">
                {element.name}
              </p>
              <p>{`${element.price}$`}</p>
              <button
                className="absolute right-2 top-2"
                onClick={() => {
                  console.log("heart clicked");
                }}
              >
                <Heart></Heart>
              </button>
            </div>
          ))
        ) : (
          <div className="text-primary-300">Loading....</div>
        )}
      </div>
    </section>
  );
}

export default ProductsSection;
