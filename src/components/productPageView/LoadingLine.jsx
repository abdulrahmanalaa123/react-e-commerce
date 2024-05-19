import ContentLoader from "react-content-loader";

function LoadingLine() {
  return (
    <ContentLoader
      speed={1}
      width={600}
      height={40}
      viewBox="0 0 600 40"
      backgroundColor="#ecffe0"
      foregroundColor="#c7dab9"
      className="w-full"
    >
      <rect x="0" y="11" rx="3" ry="3" width="410" height="20" />
    </ContentLoader>
  );
}

export default LoadingLine;
