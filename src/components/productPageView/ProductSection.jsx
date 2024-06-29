import ImageGallery from "./ImageGallery";
import AddToCart from "./AddToCart";
import FilteringOptions from "./FilteringOptions";
import ProductDetails from "./ProductDetails";
import { useLocation } from "react-router-dom";

function ProductSection() {
  // extracted to a custom hook due to the overhead of complexity instaed of jamming it all at once
  const location = useLocation();
  return (
    <section
      id="product-view"
      className="flex flex-col md:flex-row flex-grow flex-shrink  gap-6"
    >
      <section
        id="image-gallery"
        className="flex-auto mb-8 md:mb-0 md:w-1/2 z-0 flex-col flex h-[40.5rem]"
      >
        <ImageGallery key={location.key} />
      </section>
      <section
        id="variation-selector"
        className="flex-auto md:w-1/2 bg-[#F6F9F5] p-4 flex flex-col gap-6 h-min "
      >
        <ProductDetails>
          <FilteringOptions />
        </ProductDetails>
        <AddToCart key={location.key} />
      </section>
    </section>
  );
}

export default ProductSection;
