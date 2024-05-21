import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/home/Home";

import queryClient from "../lib/react-query";

import { lazy } from "react";
// tried to lazy load the loaders as well but couldnt for some reasson it wasnt realized as a function
// especiialy the the productPageLoader idk why couldnt figure it out eventially so i opted just to import it normally
import productPageLoader from "../layouts/layoutLoaders/productPageLoader";
import productsLoader from "../layouts/layoutLoaders/productsLoader";

let ProductsLayout = lazy(() => import("../layouts/ProductsLayout"));
let ProductDoesntExist = lazy(() =>
  import("../pages/productPage/ProductDoesntExists")
);

let ProductPageLayout = lazy(() => import("../layouts/ProductPageLayout"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<Home />}></Route>
      <Route
        path="products/:category?"
        element={<ProductsLayout />}
        loader={productsLoader}
        errorElement={<ProductDoesntExist />}
      ></Route>
      <Route
        path="product/:productId"
        element={<ProductPageLayout />}
        loader={productPageLoader(queryClient)}
        errorElement={<ProductDoesntExist />}
      ></Route>
    </Route>
  )
);

export default router;
