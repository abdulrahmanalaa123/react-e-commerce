import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "../routes/index";
import queryClient from "../lib/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
const ErrorBoundaryElement = () => {
  <div
    className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
    role="alert"
  >
    <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
    <Navigate
      to={"/products"}
      className="mt-4"
      // () => window.location.assign(window.location.origin)
    >
      Refresh
    </Navigate>
  </div>;
};

function AppProvider({ children }) {
  return (
    <ErrorBoundary fallback={ErrorBoundaryElement}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <RouterProvider router={router}>{children}</RouterProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default AppProvider;
