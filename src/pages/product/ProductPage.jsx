import Heart from "../../assets/svgs/Heart";
import HoverButton from "../../components/buttons/HoverButton";
import CustomCarousel from "../../components/home/CustomCarousel";
import HomeCardLayout from "../../components/home/HomeCardLayout";
import ProductSection from "../../components/productPageView/ProductSection";
import offerFlower from "../../assets/images/OfferFlower.png";
import useProductView from "../../hooks/productView";

function ProductPage() {
  const { invariantProductData } = useProductView();
  return (
    <section id="product-page" className="flex flex-col gap-6">
      <ProductSection></ProductSection>
      <section className="product-description flex-grow flex-shrink ">
        <p className="w-fit mx-auto text-md font-bold border-b-2 border-b-primary-300 mb-6">
          Product Description
        </p>

        <div className="bg-[#EAEAEA4D] px-10 pt-10 pb-20 mb-4">
          {invariantProductData.isSuccess
            ? invariantProductData.data.description
            : ""}
        </div>

        <div className="mb-6">
          <p className="text-lg">You might also like</p>
          <CustomCarousel>
            {new Array(4).fill(null).map((_, index) => {
              return (
                <HomeCardLayout key={index}>
                  <HoverButton></HoverButton>

                  <div>
                    <img
                      src={offerFlower}
                      className="w-[150px] aspect-[3/4] mt-2 mb-4"
                    />
                  </div>
                  <div className="mb-4 text-center self-center leading-[30px] text-[20px] ">
                    <p>Rose</p>
                    <p>{"8.00$"}</p>
                  </div>
                  <button className="absolute right-2 top-2">
                    <Heart filled={false}></Heart>
                  </button>
                </HomeCardLayout>
              );
            })}
          </CustomCarousel>
        </div>
      </section>
    </section>
  );
}

export default ProductPage;
