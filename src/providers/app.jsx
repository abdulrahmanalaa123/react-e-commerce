import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "../routes/index";
import queryClient from "../lib/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />

      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router}>{children}</RouterProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
