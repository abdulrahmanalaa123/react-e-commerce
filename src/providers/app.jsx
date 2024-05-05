import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, useNavigate } from "react-router-dom";
import router from "../routes/index";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ErrorFallback = () => {
  const navigate = useNavigate();
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        // () => window.location.assign(window.location.origin)
        onClick={() => navigate(0)}
      >
        Refresh
      </Button>
    </div>
  );
};
const queryClient = new QueryClient();

function AppProvider({ children }) {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <RouterProvider router={router}>{children}</RouterProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default AppProvider;
