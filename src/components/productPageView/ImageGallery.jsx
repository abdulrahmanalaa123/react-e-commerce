import { useCallback, useState } from "react";
import "./ImageGallery.css";
import PhotosCarousel from "./PhotosCarousel";
import "glider-js/glider.min.css";

function ImageGallery({ images }) {
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
  //   this all is shit and will use react-slick later now i need to fucking optimize somehow
  return (
    <section
      id="image-gallery"
      className="flex-auto mb-8 md:mb-0 md:w-1/2 z-0 flex-col flex h-[40.5rem]"
    >
      <PhotosCarousel
        className="relative rounded-sm w-full h-[calc(100%-100px)] "
        config={{ hasArrows: images.length > 1 }}
        currentSlideIdx={currentPhotoIdx}
        onSlideChange={onSlideChangeHandler}
      >
        {images.map((image) => {
          return (
            <div className="h-full max-h-full">
              <img
                src={image}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          );
        })}
      </PhotosCarousel>

      <PhotosCarousel
        config={{
          hasArrows: false,
          slidesToScroll: "auto",
          slidesToShow: "auto",
          itemWidth: 100,
        }}
        currentSlideIdx={currentPhotoIdx}
        className="relative rounded-sm  max-h-20 mt-6 max-w-full mx-auto   "
        // these are the gradient applied ont he thumbnails but fuck it it isnt helping at all
        // before:absolute before:inset-0 before:content-[''] before:pointer-events-none
        // before:bg-gradient-to-r before:from-[rgba(255,255,255,0.7)] before:from-0% before:via-transparent
        //  before:to-[rgba(255,255,255,0.7)] before:to-100% before:z-10
        //  before:w-full before:h-full
      >
        {images.map((image, index) => {
          return (
            <div
              className={`w-full max-h-full mx-3 min-w-min px-0 ${
                index === currentPhotoIdx
                  ? "center border-black border-b-2 "
                  : ""
              }`}
              onClick={onClickPhotoHandler(index)}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-scale-down"
              />
            </div>
          );
        })}
      </PhotosCarousel>
    </section>
  );
}

export default ImageGallery;
