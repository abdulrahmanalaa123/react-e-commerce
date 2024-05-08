import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import loadingIcon from "../../../assets/loadingAnimation.json";

function LoadingComponent() {
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <Player
        ref={playerRef}
        size={96}
        icon={loadingIcon}
        onComplete={() => playerRef.current?.playFromBeginning()}
      />
      <div className="text-center font-bold text-text-300">
        Please wait while we pluck the Seeds
      </div>
    </div>
  );
}

export default LoadingComponent;
