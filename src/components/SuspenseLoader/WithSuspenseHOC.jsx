import { Suspense } from "react";

export const withSuspense = (WrappedComponent, Fallback) => (props) => {
  return (
    <Suspense fallback={Fallback}>
      <WrappedComponent {...props}></WrappedComponent>
    </Suspense>
  );
};
