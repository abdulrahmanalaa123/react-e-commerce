import { useCallback, useState } from "react";
import "./ImageGallery.css";
import PhotosCarousel from "./PhotosCarousel";
import "glider-js/glider.min.css";
import useProductView from "../../hooks/productView";
import { useVariationImages } from "../../api/images/getVariationImages";
import LoadableImage from "./LoadableImage";
function ImageGallery() {
  const { imagesEnabled, getSelectedVariationIds, invariantProductData } =
    useProductView();

  const imageGallery = useVariationImages({
    variationIds: getSelectedVariationIds(),
    enabled: imagesEnabled,
  });
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const onClickPhotoHandler = useCallback(
    (idx) => () => setCurrentPhotoIdx(idx),
    []
  );
  const onSlideChangeHandler = useCallback(
    (photoIdx) => {
      setCurrentPhotoIdx(photoIdx);
    },
    [setCurrentPhotoIdx]
  );
  //it will always fallback even if error to the base Image
  const images =
    imageGallery.isSuccess && imageGallery.data.length
      ? imageGallery.data
      : [invariantProductData?.data?.baseImage];

  return (
    <>
      <PhotosCarousel
        className="relative rounded-sm w-full h-[calc(100%-100px)] image-carousel"
        config={{ hasArrows: imageGallery?.data?.length > 1 }}
        currentSlideIdx={currentPhotoIdx}
        onSlideChange={onSlideChangeHandler}
      >
        {imageGallery.isLoading ? (
          <LoadableImage className="w-full h-full object-contain" />
        ) : (
          images.map((image) => {
            return (
              <div
                className="h-full flex flex-col justify-end"
                key={`${image}-fullSize`}
              >
                <LoadableImage
                  src={image}
                  className="w-full h-full object-contain"
                />
                <p className="self-center mb-3 ">
                  {currentPhotoIdx + 1}/{images.length}
                </p>
              </div>
            );
          })
        )}
      </PhotosCarousel>

      <PhotosCarousel
        config={{
          hasArrows: false,
          slidesToScroll: "auto",
          slidesToShow: "auto",
          itemWidth: 100,
        }}
        currentSlideIdx={currentPhotoIdx}
        className="relative rounded-sm  max-h-20 mt-6 max-w-full mx-auto "
      >
        {imageGallery.isLoading ? (
          <LoadableImage className="w-full h-full object-contain" />
        ) : (
          images.map((image, index) => {
            return (
              <div
                className={`w-full max-h-full mx-3 min-w-min px-0 ${
                  index === currentPhotoIdx
                    ? "center border-black border-b-2 "
                    : ""
                }`}
                key={`${image}-thumbnails`}
                onClick={onClickPhotoHandler(index)}
              >
                <LoadableImage
                  src={image}
                  className="w-full h-full object-scale-down"
                />
              </div>
            );
          })
        )}
      </PhotosCarousel>
    </>
  );
}

export default ImageGallery;
