import { useState } from "react";
import ContentLoader from "react-content-loader";

function LoadableImage({ className, src }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <ContentLoader
        speed={1}
        viewBox="0 0 600 600"
        backgroundColor="#eaeaea4d"
        foregroundColor="#c4c6c3"
        className={className}
        style={{ display: isLoading ? "block" : "none" }}
      >
        <rect x="0" y="0" rx="8" ry="8" width="600" height="600" />
      </ContentLoader>
      {src && (
        <img
          src={src}
          className={className}
          style={{ display: isLoading ? "none" : "block" }}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      )}
    </>
  );
}

export default LoadableImage;
