import { forwardRef, useEffect, useMemo, useRef } from "react";
import Glider from "react-glider";

const defaultConfig = {
  duration: 0.75,
  slidesToShow: 1,
  slidesToScroll: 1,
  dragVelocity: 2,
  scrollPropagate: true,
  scrollLockDelay: 100,
  scrollLock: true,
  hasArrows: true,
  draggable: true,
  itemWidth: undefined,
};

const PhotosCarousel = ({
  children,
  onSlideChange = () => null,
  initialSlideIdx = 1,
  currentSlideIdx,
  className = "",
  config: customConfig = {},
}) => {
  const carouselRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const config = useMemo(() => {
    return Object.assign({}, defaultConfig, customConfig);
  }, [customConfig]);

  useEffect(() => {
    const glider = carouselRef.current;
    if (glider.slide !== currentSlideIdx) {
      glider.scrollItem(currentSlideIdx);
    }
  }, [currentSlideIdx]);

  return (
    <div className={className}>
      {config.hasArrows && (
        <>
          <LeftArrow ref={leftRef}></LeftArrow>
          <RightArrow ref={rightRef}></RightArrow>
        </>
      )}
      <Glider
        ref={carouselRef}
        draggable
        {...config}
        arrows={{ prev: leftRef.current, next: rightRef.current }}
        // the context detail is the context of the custom slide event implemented inside gliderJS
        onSlideVisible={(context) => onSlideChange(context.detail.slide)}
        scrollToSlide={initialSlideIdx}
        onRefresh={() => {
          onSlideChange(0);
        }}
      >
        {children}
      </Glider>
    </div>
  );
};

export default PhotosCarousel;

const LeftArrow = forwardRef((props, ref) => {
  return (
    <button
      className="h-full absolute left-0 rounded-l-sm top-0 bottom-0 px-4 z-10 cursor-pointer flex justify-center items-center  hover:bg-text-300 hover:bg-opacity-50 focus-visible:bg-text-300 focus-visible:bg-opacity-50"
      id="buttonPrev"
      ref={ref}
      {...props}
    >
      <svg
        width="16"
        height="28"
        viewBox="0 0 16 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.3882 27.3837C15.7799 26.9889 16 26.4536 16 25.8954C16 25.3372 15.7799 24.8019 15.3882 24.4072L5.04411 13.9873L15.3882 3.56741C15.7688 3.1704 15.9794 2.63866 15.9747 2.08673C15.9699 1.5348 15.7502 1.00683 15.3627 0.616547C14.9753 0.226257 14.4511 0.00487518 13.9032 8.01086e-05C13.3553 -0.00471687 12.8274 0.207458 12.4333 0.590906L0.611838 12.499C0.220078 12.8938 0 13.4291 0 13.9873C0 14.5455 0.220078 15.0808 0.611838 15.4755L12.4333 27.3837C12.8252 27.7783 13.3566 28 13.9107 28C14.4649 28 14.9963 27.7783 15.3882 27.3837Z"
          fill="black"
          fillOpacity="0.7"
        />
      </svg>
    </button>
  );
});
const RightArrow = forwardRef((props, ref) => {
  return (
    <button
      className="h-full rounded-r-sm absolute right-0 bottom-0 top-0 flex px-4 z-10 cursor-pointer justify-center items-center   bg-gradient-to-r from-white from-0% via-[#E0E0E006] via-[2.53%] to-[#4A494926] to-[3%] hover:bg-text-300 hover:bg-opacity-50"
      id="buttonNext"
      ref={ref}
      {...props}
    >
      <svg
        width="16"
        height="28"
        viewBox="0 0 16 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-180"
      >
        <path
          d="M15.3882 27.3837C15.7799 26.9889 16 26.4536 16 25.8954C16 25.3372 15.7799 24.8019 15.3882 24.4072L5.04411 13.9873L15.3882 3.56741C15.7688 3.1704 15.9794 2.63866 15.9747 2.08673C15.9699 1.5348 15.7502 1.00683 15.3627 0.616547C14.9753 0.226257 14.4511 0.00487518 13.9032 8.01086e-05C13.3553 -0.00471687 12.8274 0.207458 12.4333 0.590906L0.611838 12.499C0.220078 12.8938 0 13.4291 0 13.9873C0 14.5455 0.220078 15.0808 0.611838 15.4755L12.4333 27.3837C12.8252 27.7783 13.3566 28 13.9107 28C14.4649 28 14.9963 27.7783 15.3882 27.3837Z"
          fill="black"
          fillOpacity="0.7"
        />
      </svg>
    </button>
  );
});
