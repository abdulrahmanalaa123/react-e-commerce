import { useNProgress } from "@tanem/react-nprogress";

function SuspenseLoader({ isAnimating }) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      style={{
        opacity: isFinished ? 0 : 1,
        pointerEvents: "none",
        position: "relative",
        transition: `opacity ${animationDuration}ms linear`,
        height: "min-content",
        zIndex: 10,
      }}
    >
      <div
        // didnt work i guess because of tailwind compilation or sth mbe im wrong and i just wrote it wrong
        // className={`bg-primary-300 h-1 left-0 absolute top-0 ml-[${
        //   (-1 + progress) * 100
        // }%] ease-linear transition-transform w-full z-50 duration-[${animationDuration}]`}
        style={{
          background: "#387709",
          height: 2,
          left: 0,
          marginLeft: `${(-1 + progress) * 100}%`,
          position: "absolute",
          top: "-30px",
          transition: `margin-left ${animationDuration}ms linear`,
          width: "100%",
          zIndex: 10,
        }}
      ></div>
    </div>
  );
}

export default SuspenseLoader;
