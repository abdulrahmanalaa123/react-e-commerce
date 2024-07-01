import React, { useEffect, useRef } from "react";

function CustomCarousel(props) {
  const slider = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(null);
  const scrollLeft = useRef(null);
  const dragStartTime = useRef(null);
  const upWalk = useRef(null);
  const isMobile = navigator.userAgentData.mobile;
  useEffect(() => {
    if (slider && slider.current) {
      let sliderRef = slider.current;
      if (isMobile) {
        sliderRef.addEventListener("touchstart", oneMobile);
        sliderRef.addEventListener("touchend", three);
        sliderRef.addEventListener("touchcancel", two);
        sliderRef.addEventListener("touchmove", fourMobile);
      } else {
        sliderRef.addEventListener("mousedown", one);
        sliderRef.addEventListener("mouseleave", two);
        sliderRef.addEventListener("mouseup", three);
        sliderRef.addEventListener("mousemove", four);
      }

      return () => {
        if (isMobile) {
          sliderRef.removeEventListener("touchstart", oneMobile);
          sliderRef.removeEventListener("touchend", two);
          sliderRef.removeEventListener("touchcancel", three);
          sliderRef.removeEventListener("touchmove", fourMobile);
        } else {
          sliderRef.removeEventListener("mousedown", one);
          sliderRef.removeEventListener("mouseleave", two);
          sliderRef.removeEventListener("mouseup", three);
          sliderRef.removeEventListener("mousemove", four);
        }
      };
    }
  }, [isMobile]);

  function one(e) {
    isDown.current = true;
    // the offset of the element from the border of the body
    startX.current = e.pageX - slider.current.offsetLeft;
    // the initial scroll positon = the latest scrollPosition of the element
    scrollLeft.current = slider.current.scrollLeft;
  }
  function oneMobile(e) {
    isDown.current = true;
    // the offset of the element from the border of the body
    startX.current = e.targetTouches[0].pageX - slider.current.offsetLeft;
    // the initial scroll positon = the latest scrollPosition of the element
    scrollLeft.current = slider.current.scrollLeft;
  }
  function two() {
    //reset basically everything used in the animations
    isDown.current = false;
    upWalk.current = null;
    dragStartTime.current = null;
    slider.current.style.transform = "";
  }

  function three(e) {
    //reset the 2 refs which are not used in the slide animation
    isDown.current = false;
    slider.current.style.transform = "";
    let frictionMultiplier;
    if (isMobile) {
      frictionMultiplier = 4;
    } else {
      frictionMultiplier = 8;
    }
    // Check if there's any remaining walk distance for animation
    // this is the code for the sliding animation
    if (upWalk.current && dragStartTime.current) {
      const duration = 300;
      // get the current time at the start of the animation
      let zeroTime = e.timeStamp;
      let xVelocity =
        // the velocity multiplier can be named the friction multiplier the higher the number the less the friction which means higher initial velocity
        Math.round(upWalk.current / (dragStartTime.current - zeroTime)) *
        frictionMultiplier;
      // const step = Math.min(xVelocity / duration);
      const animationFunction = () => {
        const value = (performance.now() - zeroTime) / duration;
        if (value < 1 && xVelocity !== 0) {
          //
          slider.current.scrollLeft = slider.current.scrollLeft + xVelocity;
          xVelocity = xVelocity * 0.96;
          requestAnimationFrame((t) => animationFunction(t));
        } else {
          dragStartTime.current = null;
          upWalk.current = null;
        }
      };

      requestAnimationFrame(animationFunction);
    }
  }
  function four(e) {
    if (!isDown.current) return;
    if (!dragStartTime.current) {
      dragStartTime.current = e.timeStamp;
    }
    e.preventDefault();
    // current mouse positiong taking into account the space of the component from the wall
    const x = e.pageX - slider.current.offsetLeft;
    // the difference between current mouse position inside the component and the startmouse position in  the down click
    const walk = x - startX.current;
    // the difference is between the initial scroll position of the carousel and the the current Mouse X position
    slider.current.scrollLeft = scrollLeft.current - walk;

    if (
      slider.current.scrollLeft >=
        slider.current.scrollWidth - slider.current.offsetWidth - 2 ||
      slider.current.scrollLeft <= 0
    ) {
      if (walk > 0) {
        slider.current.style.transform = `translateX(${Math.min(walk, 100)}px)`;
      } else {
        slider.current.style.transform = `translateX(${Math.max(
          walk,
          -100
        )}px)`;
      }
    } else {
      // remove the translation from the style
      slider.current.style.transform = "";
    }

    upWalk.current = walk;
  }
  function fourMobile(e) {
    if (!isDown.current) return;
    if (!dragStartTime.current) {
      dragStartTime.current = e.timeStamp;
    }
    e.preventDefault();
    // current mouse positiong taking into account the space of the component from the wall
    const x = e.targetTouches[0].pageX - slider.current.offsetLeft;
    // the difference between current mouse position inside the component and the startmouse position in  the down click
    const walk = x - startX.current;
    // the difference is between the initial scroll position of the carousel and the the current Mouse X position
    slider.current.scrollLeft = scrollLeft.current - walk;

    if (
      slider.current.scrollLeft >=
        slider.current.scrollWidth - slider.current.offsetWidth - 2 ||
      slider.current.scrollLeft <= 0
    ) {
      if (walk > 0) {
        slider.current.style.transform = `translateX(${Math.min(walk, 100)}px)`;
      } else {
        slider.current.style.transform = `translateX(${Math.max(
          walk,
          -100
        )}px)`;
      }
    } else {
      // remove the translation from the style
      slider.current.style.transform = "";
    }

    upWalk.current = walk;
  }

  return (
    <section
      className="overflow-x-hidden overflow-y-hidden w-full whitespace-nowrap transition-transform duration-300 ease-out mt-2 flex gap-4 flex-nowrap cursor-grab"
      ref={slider}
    >
      {props.children}
    </section>
  );
}

export default CustomCarousel;
