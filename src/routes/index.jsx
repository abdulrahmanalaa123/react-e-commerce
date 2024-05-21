import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/home/Home";

import queryClient from "../lib/react-query";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<Home />}></Route>
      <Route
        path="products/:category?"
        lazy={async () => {
          let ProductsLayout = await import("../layouts/ProductsLayout");
          let productsLoader = await import(
            "../layouts/layoutLoaders/productsLoader"
          );
          let ProductDoesntExist = await import(
            "../pages/productPage/ProductDoesntExists"
          );
          return {
            Component: ProductsLayout.default,
            loader: productsLoader.default,
            ErrorBoundary: ProductDoesntExist.default,
          };
        }}
      ></Route>
      <Route
        lazy={async () => {
          let ProductPageLayout = await import("../layouts/ProductPageLayout");
          let productPageLoader = await import(
            "../layouts/layoutLoaders/productPageLoader"
          );
          let ProductDoesntExist = await import(
            "../pages/productPage/ProductDoesntExists"
          );
          return {
            Component: ProductPageLayout.default,
            loader: productPageLoader.default(queryClient),
            ErrorBoundary: ProductDoesntExist.default,
          };
        }}
        path="product/:productId"
      ></Route>
    </Route>
  )
);

export default router;
